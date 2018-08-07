// Global app controller
import {elements} from './views/base';
import * as SearchView from './views/SearchView';
import Search from './models/Search';

// Make this state persistent
/** Global State object
* - current query from view
* - current recipe object
* - shopping list object
* - current liked recipes
* one central state object thatcontains all relevant information accessible
*/
const state = {};


const fetchCurrentRecipes = async () => {
  //TODO
  const query = SearchView.getInput(); // Get the query from the viewport

  // Create Search object
  if(query) {
    state.search = new Search(query);
  }

  //Get the results
  // This is an async so it return a "promise" regardless of any assignements or explicit returns programmed into it.
  await state.search.getResults();
  
  SearchView.clearInput();
  SearchView.clearResults();

  SearchView.renderResults(state.search.recipes);
}

// const searchEle = document.querySelector('.search');

elements.search.addEventListener('submit', (evt) => {
  evt.preventDefault();
  fetchCurrentRecipes();
});

elements.resultsPages.addEventListener('click', evt => {
    const btn = evt.target.closest('.btn-inline');
    if(btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      SearchView.clearResults();
      SearchView.renderResults(state.search.recipes, goToPage);
    }
    //renderResults(state.search.recipes, evt.target.id)
  });
