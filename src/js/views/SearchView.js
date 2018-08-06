import { elements } from './base';

export const getInput = () => elements.searchField.value;

export const clearInput = () => {
     elements.searchField.value = "";
};

export const clearResults = () => {
     elements.resultsList.innerHTML = "";
};

export const shortenTitle = (tit, limit = 17) => {
     const newTitle = [];
     if(tit.length > limit) {
          const words = tit.split(' ');
          words.reduce((acc, curr) => {
               if(curr.length + acc <= limit) {
                    newTitle.push(curr);
               }
               return curr.length + acc;
          }, 0);
          return `${newTitle.join(' ')} ...`;
     }
     return tit;
}

const renderRecipe = el => {
     const markup = `
          <li>
               <a class="results__link results__link--active" href=${el.id}>
                    <figure class="results__fig">
                         <img src=${el.image_url} alt=${el.title}>
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