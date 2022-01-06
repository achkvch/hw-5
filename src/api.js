import axios from 'axios';
import Notiflix from 'notiflix';
import {buttonNext, element} from './index.js'

function apiCall(url, pageNum, perPageNum) {
  axios.get(url, {
    params: {
      orientation: "horizontal",
      safesearch: true,
      image_type: "photo",
      page: pageNum,
      per_page: perPageNum,

    }
  })
  .then(res => {
    const respArr = res.data.hits;
    console.log(respArr)
    

    if (element.hasChildNodes()) {
        element.innerHTML = ''
    }

    if (respArr.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      buttonNext.classList.add("hidden")
    } else if (respArr.length < perPageNum - 1) {
      buttonNext.classList.add("hidden");
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
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

function nextPageCall(url, pageNum, perPageNum) {
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
        if (respArr.length < perPageNum - 1) {
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
    .catch((error) => {
      console.error(error);
  });
}

export {apiCall, nextPageCall, element};