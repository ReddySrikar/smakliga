import axios from 'axios';
import * as urlData from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await axios(`${urlData.proxy}http://food2fork.com/api/get?key=${urlData.apiKey}&rId=${this.id}`);
      this.recipeData = result.data.recipe;
      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.url = result.data.recipe.source_url;
      this.image = result.data.recipe.image_url;
      this.ingredients = result.data.recipe.ingredients;
    } catch (e) {
      alert(e, "Something went wrong with getRecipe!");
    }
  };

  calculateServings() {
    this.servings = 4;
  }

  calculateTime() {
       // Assuming it takes 10 minutes for 2 ingredients
       const periods = this.ingredients.length/2;
       this.time = Math.ceil(periods * 10);
  }

  /**
   * This method takes the ingredients array that is very ununiform 
   * and converts it into one array that is made up of objects that have a standard format.
   */
  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const unitsAddl = ['kg', 'g', 'ml', 'l'];
    const units = [...unitsShort, ...unitsAddl];

     const parsedIngredients = this.ingredients.map(element => {  
     let currentIngredient = element.toLowerCase().trim();

      // Converts to a standard unit. Ref. Look at the array unitsShort.
      unitsLong.forEach((unit, i) => {
        currentIngredient = currentIngredient.replace(unit, unitsShort[i]);
      });

      // Converts a given ingredient into count, unit, and ingredient.
      const currIngArray = currentIngredient.split(' ');
      const unitIndex  = currIngArray.findIndex(ele => units.includes(ele));
      const isUnitsFirstElement = unitsShort.find(ele => currIngArray[0].includes(ele));
      const isGramsOrMl = unitsAddl.find(ele => currIngArray[0].endsWith(ele));

      let ingredientObject;
      // If the unit and count are combined as in 500ml or 1kg. (Units covered are kg, g, ml, and l)
      if(isGramsOrMl) {
        ingredientObject = {
          count: parseInt(currIngArray[0].replace(isGramsOrMl, '')),
          unit: isGramsOrMl,
          ingredient: currIngArray.slice(1).join(' ')
        }
        // If the unit is present without number
      } else if(isUnitsFirstElement) {
        ingredientObject = {
          count: 1,
          unit: currIngArray[0],
          ingredient: currIngArray.slice(unitIndex + 1).join(' ')
        }
        // If unit is present (which implies number is also present!)
      } else if (unitIndex > -1) {
        const arrCount = currIngArray.slice(0, unitIndex);
        let count;
        if(arrCount.length === 1) {
          count = eval(currIngArray[0].replace('-', '+'));
        } else {
          count = eval(arrCount.join('+'));
        }

        ingredientObject = {
          count,
          unit: currIngArray[unitIndex],
          ingredient: currIngArray.slice(unitIndex + 1).join(' ')
        }
        //If the number is present without unit.
      } else if(parseInt(currIngArray[0], 10)) {
        ingredientObject = {
          count: parseInt(currIngArray[0]),
          unit: '',
          ingredient: currIngArray.slice(1).join(' ')
        }        
        // If the unit and number are absent.     
      } else if (unitIndex === -1) {
        ingredientObject = {
          count: 1,
          unit: '',
          ingredient: currentIngredient
        }
      }
      return ingredientObject;
    });
    this.ingredients = parsedIngredients;
  };

  updateServings(type) {
      // Servings
      const newServings = type === 'minus' ? this.servings - 1 : this.servings + 1;

      // Ingredients
      this.ingredients.forEach(ing => {
          ing.count *= (newServings / this.servings);
      });

      this.servings = newServings;
  };
}
