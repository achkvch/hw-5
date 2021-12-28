import axios from 'axios';
import Notiflix from 'notiflix';

let url = `https://pixabay.com/api/?key=24965045-7f9ae1d71a971d1f7efc0b66f`;
let pageNum = 1;
let perPageNum = 40;
const buttonNext=document.querySelector('#loadMoreButton');


async function searchImage() {
    const q = document.getElementById('searchQuery').value;
    if (q != undefined) {
        url += `&q=${q}`
    }

    pageNum = 1;
    buttonNext.classList.add("hidden")

    axios.get(url, {
        params: {
            orientation: "horizontal",
            safesearch: true,
            image_type: "photo",
            page: pageNum,
            per_page: perPageNum,

        }
    }).then(res => {
        const element = document.getElementById("result");
        const respArr = res.data.hits;
        console.log(res.data)

        if (element.hasChildNodes()) {
            element.innerHTML = ''
        }

        if (respArr == 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          buttonNext.classList.add("hidden")
        } else {
          Notiflix.Notify.success(`Hooray! We found ${res.data.totalHits} images.`)
          buttonNext.classList.remove("hidden")
        }

        respArr.forEach(item => {
            element.insertAdjacentHTML("beforeEnd", `<div class="photo-card">
        <img src="${item.previewURL}" alt="${item.tags}" loading="lazy"/>
        <div class="info">
          <p class="info-item">
            <b>Likes - ${item.likes}</b>
          </p>
          <p class="info-item">
            <b>Views - ${item.views}</b>
          </p>
          <p class="info-item">
            <b>Comments - ${item.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads - ${item.downloads}</b>
          </p>
        </div>
      </div>`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
}

function nextPage() {
    pageNum++;

    axios.get(url, {
        params: {
            orientation: "horizontal",
            safesearch: true,
            image_type: "photo",
            page: pageNum,
            per_page: perPageNum,
        }
    }).then(res => {
        const element = document.getElementById("result");
        const respArr = res.data.hits;
        if (respArr < 39) {
          buttonNext.classList.add("hidden");
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
        respArr.forEach(item => {
            element.insertAdjacentHTML("beforeEnd", `<div class="photo-card">
        <img src="${item.previewURL}" alt="${item.tags}" loading="lazy"/>
        <div class="info">
          <p class="info-item">
            <b>Likes - ${item.likes}</b>
          </p>
          <p class="info-item">
            <b>Views - ${item.views}</b>
          </p>
          <p class="info-item">
            <b>Comments - ${item.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads - ${item.downloads}</b>
          </p>
        </div>
      </div>`);
        });
    })
}

export {searchImage, nextPage}