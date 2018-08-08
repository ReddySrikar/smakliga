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
}
