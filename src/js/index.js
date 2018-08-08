// Global app controller
import {elements} from './views/base';
import * as SearchView from './views/SearchView';
import Search from './models/Search';
import Recipe from './models/Recipe';

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

  // Get the results
  // This is an async so it return a "promise" regardless of any assignements or explicit returns programmed into it.
  try{
    await state.search.getResults();

    SearchView.clearInput();
    SearchView.clearResults();

    SearchView.renderResults(state.search.results);
  } catch(error) {
    alert('Oopsy doopsy! Something wrong with the search!')
  }
};

elements.search.addEventListener('submit', (evt) => {
  evt.preventDefault();
  controlSearch();
});

/**RECIPE Controller */
const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');
  if(id){
    console.log(id);

    // TODO
    // Prepare UI for changes i.e. clear the previous recipe data and render the loader

    // Create Recipe object
    state.recipe = new Recipe(id);

    // TODO
    // Parse ingredients to make them uniform

    try{
      // Fetch recipe data
      await state.recipe.getRecipe();

    // TODO
    // Calculate time and servings
    state.recipe.calculateTime();
    state.recipe.calculateServings();

      // TODO
      // Render recipe to UI
      console.log(state.recipe);
    } catch(error) {
      alert('Oopsy doopsy! Error processing recipe!')
    }
  }
};

['hashchange', 'load'].forEach(evt => window.addEventListener(evt, controlRecipe));
