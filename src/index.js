import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
    breedSelector: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfoContainer: document.querySelector('.cat-info'),
};
const { breedSelector, loader, error, catInfoContainer } = ref;

loader.classList.replace('loader', 'is-hidden');

let breedIndexArray = [];

fetchBreeds()
  .then(data => {
    breedIndexArray = data.map(item => ({ text: item.name, value: item.id }));
    new SlimSelect({
      select: breedSelector,
      data: breedIndexArray
    });
  }).catch(handleError);

breedSelector.addEventListener('change', handleBreedSelect);

function handleBreedSelect(event) {
    loader.classList.replace('is-hidden', 'loader');
    catInfoContainer.classList.add('is-hidden');
  
    const breedId = event.currentTarget.value;

    fetchCatByBreed(breedId)
    .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        breedSelector.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        catInfoContainer.innerHTML = `<div class="photo container">
        <img src="${url}" alt="${breeds[0].name}" width="400"/>
        </div>
        <div class="text container">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p><span class='temp'>Temperament:</span>  ${breeds[0].temperament}</p>
        </div>`
        catInfoContainer.classList.remove('is-hidden');
   
    })
    .catch(handleError);
};

function handleError(error) {
    breedSelector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page!');
};
   
     
  