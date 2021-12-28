import './sass/main.scss';
import {searchImage, nextPage} from './api.js';

const buttonSearch=document.querySelector('#buttonSubmit');
buttonSearch.addEventListener('click', searchImage);

const buttonNext=document.querySelector('#loadMoreButton');
buttonNext.addEventListener('click', nextPage);
