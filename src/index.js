import './sass/main.scss';
import listMarkup from './templates/gallery-item-template.hbs';
import { refs } from './js/refs';
import { fetchApi } from './js/apiService';

let pageNum = 1;

// refs.input.addEventListener('keypress', makeMarkup);
refs.form.addEventListener('submit', makeMarkup);
refs.loadMoreBtn.addEventListener('click', makeMoreMarkup);

function makeMarkup(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  pageNum = 1;

  fetchApi(refs.input.value, pageNum)
    .then(data => {
      if (data.hits.length === 0) {
        console.log('Ничего не найдено!');
      } else {
        refs.gallery.insertAdjacentHTML('beforeend', listMarkup(data.hits));
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .then(() => pageNum++)
    .catch(err => {
      console.log('err', err);
    });
}

function makeMoreMarkup(e) {
  e.preventDefault();

  fetchApi(refs.input.value, pageNum)
    .then(data => {
      refs.gallery.insertAdjacentHTML('beforeend', listMarkup(data.hits));
    })
    .then(() => pageNum++)
    .then(() => refs.gallery.scrollIntoView({ block: 'end', behavior: 'smooth' }))
    .catch(err => {
      console.log('err', err);
    });
}
