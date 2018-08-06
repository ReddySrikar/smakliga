// Global app controller
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
  const query = "biryani"; // Get the query from the viewport

  // Create Search object
  if(query) {
    state.search = new Search(query);
  }

  //Get the results
  // This is an async so it return a "promise" regardless of any assignements or explicit returns programmed into it.
  await state.search.getResults();

  // TODO:Render the dropdown table UI

  // Append the results to the UI: We console log it for now
  state.search.recipes.map((a) => console.log(a.title));
}

const searchEle = document.querySelector('.search');

searchEle.addEventListener('submit', (evt) => {
  evt.preventDefault();
  fetchCurrentRecipes();
});
