// Global app controller
import { elements, renderLoader, clearLoader} from './views/base';
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as RecipeView from './views/RecipeView';
import * as SearchView from './views/SearchView';

// Make this state persistent
/** Global State object
* - current query from view
* - current recipe object
* - shopping list object
* - current liked recipes
* one central state object thatcontains all relevant information accessible
*/
const state = {};

/**SEARCH Controller */
const controlSearch = async () => {
  const query = SearchView.getInput();
  // Create Search object
  if(query) {
    state.search = new Search(query);
  }

  // const searchEle = document.querySelector('.search');
  SearchView.clearInput();
  SearchView.clearResults();
  renderLoader(elements.results);

  // Get the results
  // This is an async so it return a "promise" regardless of any assignements or explicit returns programmed into it.
  try{
    await state.search.getResults();
    clearLoader();

    SearchView.renderResults(state.search.results);
  } catch(error) {
    console.log(error);
    alert('Oopsy doopsy! Something wrong with the search!')
  }
};

elements.search.addEventListener('submit', (evt) => {
  evt.preventDefault();
  controlSearch();
});

elements.resultsPages.addEventListener('click', evt => {
  const btn = evt.target.closest('.btn-inline');
  if(btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    SearchView.clearResults();
    SearchView.renderResults(state.search.results, goToPage);
  }
});

/**RECIPE Controller */
const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');
  if(id){

    // TODO:
    // Prepare UI for changes i.e. clear the previous recipe data and render the loader
    RecipeView.clearRecipe();
    renderLoader(elements.recipeTab);

    // Create Recipe object
    state.recipe = new Recipe(id);

    try{
      // Fetch recipe data
      await state.recipe.getRecipe();

      state.recipe.calculateTime();
      state.recipe.calculateServings();

      // Parse ingredients to make them uniform
      state.recipe.parseIngredients();
      clearLoader();

      // Render recipe to UI
      RecipeView.renderRecipe(state.recipe);
    } catch(error) {
      // Alert the error
      console.log(error);
      alert('Oopsy doopsy! Error processing recipe!')
    }
  }
};

['hashchange', 'load'].forEach(evt => window.addEventListener(evt, controlRecipe));


// Handlers for recipe clicks
elements.recipeTab.addEventListener('click', evt => {
    if(evt.target.matches('.btn-decrease, .btn-decrease *')) {
      state.recipe.updateServings('minus');
      RecipeView.updateServingsIngredients(state.recipe);
    } else if(evt.target.matches('.btn-increase, .btn-increase *')) {
      state.recipe.updateServings('plus');
      RecipeView.updateServingsIngredients(state.recipe);
    }
});