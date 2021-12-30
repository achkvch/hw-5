import './sass/main.scss';
import './api.js';
import {nextPage, searchImage} from './search.js'

const formSearch=document.querySelector('#search-form');
const buttonNext=document.querySelector('#loadMoreButton');
const element = document.getElementById("result");
formSearch.addEventListener('submit', searchImage);
buttonNext.addEventListener('click', nextPage);

export {buttonNext, element}