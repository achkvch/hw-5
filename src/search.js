import {nextPageCall, apiCall} from './api.js';
import {buttonNext, element} from './index.js'
import notiflix from 'notiflix';

let url = `https://pixabay.com/api/?key=24965045-7f9ae1d71a971d1f7efc0b66f`;
let pageNum = 1;
let perPageNum = 40;

async function searchImage(evt) {
  evt.preventDefault();
  const form = evt.currentTarget;
  const q = form.elements.searchQuery.value.trim();
    if (q !== '') {
        url += `&q=${q}`
        pageNum = 1;
        buttonNext.classList.add("hidden")
        apiCall(url, pageNum, perPageNum);
    } else if (q === '' && element.hasChildNodes()) {
        element.innerHTML = ''
        buttonNext.classList.add("hidden")
    }
}

async function nextPage() {
    pageNum++;
    nextPageCall(url, pageNum, perPageNum);
}

export {nextPage, searchImage}