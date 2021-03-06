import { elements } from './base';
import { Fraction } from 'fractional';

const formatCount = (count) => {
    const [int, fract] = count.toString().split('.').map(el => parseInt(el, 10));
    if(!fract) {
        return `${int}`;
    } else if (int === 0) {
        const fr = new Fraction(count);
        return `${fr.numerator}/${fr.denominator}`;
    } else {
        const fr = new Fraction(count-int);
        return `${int} ${fr.numerator}/${fr.denominator}`;
    }
};

const persistBackground = (id) => {
    document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active');
};

const renderIngredient = (ingredients) => {
     var finalMarkup = '';
     ingredients.forEach(el => {
          const ingredientMarkup = `
          <li class="recipe__item">
               <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
               </svg>
               <div class="recipe__count">${formatCount(el.count)}</div>
               <div class="recipe__ingredient">
                    <span class="recipe__unit">${el.unit}</span>${el.ingredient}
               </div>
          </li>`;

          finalMarkup+=ingredientMarkup;
     })
     return finalMarkup;
};

export const renderRecipe = (recipe) => {
     const recipeMarkup = `<figure class="recipe__fig">
     <img src="${recipe.image}" alt="Tomato" class="recipe__img">
     <h1 class="recipe__title">
         <span>${recipe.title}</span>
     </h1>
 </figure>
 <div class="recipe__details">
     <div class="recipe__info">
         <svg class="recipe__info-icon">
             <use href="img/icons.svg#icon-stopwatch"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
         <span class="recipe__info-text"> minutes</span>
     </div>
     <div class="recipe__info">
         <svg class="recipe__info-icon">
             <use href="img/icons.svg#icon-man"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
         <span class="recipe__info-text"> servings</span>

         <div class="recipe__info-buttons">
             <button class="btn-tiny btn-decrease">
                 <svg>
                     <use href="img/icons.svg#icon-circle-with-minus"></use>
                 </svg>
             </button>
             <button class="btn-tiny btn-increase">
                 <svg>
                     <use href="img/icons.svg#icon-circle-with-plus"></use>
                 </svg>
             </button>
         </div>

     </div>
     <button class="recipe__love">
         <svg class="header__likes">
             <use href="img/icons.svg#icon-heart-outlined"></use>
         </svg>
     </button>
 </div>



 <div class="recipe__ingredients">
     <ul class="recipe__ingredient-list">
         ${renderIngredient(recipe.ingredients)}
     </ul>

     <button class="btn-small recipe__btn">
         <svg class="search__icon">
             <use href="img/icons.svg#icon-shopping-cart"></use>
         </svg>
         <span>Add to shopping list</span>
     </button>
 </div>

 <div class="recipe__directions">
     <h2 class="heading-2">How to cook it</h2>
     <p class="recipe__directions-text">
         This recipe was carefully designed and tested by
         <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
     </p>
     <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
         <span>Directions</span>
         <svg class="search__icon">
             <use href="img/icons.svg#icon-triangle-right"></use>
         </svg>

     </a>
 </div>`;

 elements.recipeTab.insertAdjacentHTML('beforeend', recipeMarkup);
};

export const clearRecipe = () => {
    elements.recipeTab.innerHTML = '';
};

export const updateServingsIngredients = recipe => {
    // Update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // Update ingredients count
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    console.log('countElements :', countElements);
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
        console.log('i', el.textContent);
    });
};
