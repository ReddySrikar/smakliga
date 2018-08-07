import { elements } from './base';

export const getInput = () => elements.searchField.value;

export const clearInput = () => {
     elements.searchField.value = "";
};

export const clearResults = () => {
     elements.resultsList.innerHTML = "";
     elements.resultsPages.innerHTML = "";
};

const shortenTitle = (tit, limit = 17) => {
     const newTitle = [];
     if(tit.length > limit) {
          const words = tit.split(' ');
          words.reduce((acc, curr) => {
               if(curr.length + acc <= limit) {
                    newTitle.push(curr);
               }
               return curr.length + acc;
          }, 0);
          return newTitle.join(' ') + '...';
     }
     return tit;
}

const renderRecipe = el => {
     const markup = `
          <li>
               <a class="results__link results__link--active" href="#${el.recipe_id}">
                    <figure class="results__fig">
                         <img src="${el.image_url}" alt="${el.title}">
                    </figure>
                    <div class="results__data">
                         <h4 class="results__name">${shortenTitle(el.title)}</h4>
                         <p class="results__author">${el.publisher}</p>
                    </div>
               </a>
          </li>
     `;

     elements.resultsList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
     recipes.forEach(element => {
          renderRecipe(element);
     });
};

const createButton = (page, type) => `
     <button class="btn-inline results__btn--${type}" id=${page} data-goto=${page}>
          <span>Page ${page}</span>
          <svg class="search__icon">
               <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
          </svg>
     </button>`;

const renderPageButtons = (currentPage, totalResults, resPerPage) => {
     const totalPages = Math.ceil(totalResults/resPerPage);

     let button;
     if(currentPage === 1 && totalPages >> 1) {
          button = `${createButton(currentPage + 1, 'next')}`;
     } else if(currentPage === totalPages && totalPages >> 1) {
          button = `${createButton(currentPage - 1, 'prev')}`;
     } else if(currentPage < totalPages) {
          button = `${createButton(currentPage - 1, 'prev')}
                    ${createButton(currentPage + 1, 'next')}`;
     }

     if(button !== undefined)
     elements.resultsPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
     const start = (page - 1) * resPerPage;
     const end = start + resPerPage; 
     recipes.slice(start, end).forEach(renderRecipe);

     renderPageButtons(page, recipes.length, resPerPage);
};
