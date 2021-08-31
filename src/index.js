import './sass/main.scss';
import listMarkup from './templates/gallery-item-template.hbs';
import { refs } from './js/refs';
import { fetchApi } from './js/apiService';
import { success, error, defaults } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import '../node_modules/@pnotify/confirm/dist/PNotifyConfirm.css';
import * as basicLightbox from 'basiclightbox';

defaults.delay = 1500;
let pageNum = 1;

refs.form.addEventListener('submit', makeMarkup);
refs.loadMoreBtn.addEventListener('click', makeMoreMarkup);

function makeMarkup(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  pageNum = 1;
  sessionStorage.setItem('searchQuery', refs.input.value);
  const searchInput = sessionStorage.getItem('searchQuery');

  if (searchInput) {
    return fetchApi(searchInput, pageNum)
      .then(data => {
        console.log('data: ', data);
        if (data.hits.length === 0) {
          error({ text: `Ничего не найдено!` });
          refs.loadMoreBtn.classList.add('is-hidden');
          refs.input.value = '';
        } else {
          refs.gallery.insertAdjacentHTML('beforeend', listMarkup(data.hits));
          refs.loadMoreBtn.classList.remove('is-hidden');
          success({ text: `Ваш ответ по запросу ${refs.input.value} :)` });
          refs.input.value = '';
        }
      })
      .then(() => pageNum++)
      .catch(err => {
        error({ text: `Возникла ошибка ${err}. Попробуйте ещё` });
      });
  } else refs.loadMoreBtn.classList.add('is-hidden');
}

function makeMoreMarkup(e) {
  e.preventDefault();

  const moreInfoInput = sessionStorage.getItem('searchQuery');

  fetchApi(moreInfoInput, pageNum)
    .then(data => {
      refs.gallery.insertAdjacentHTML('beforeend', listMarkup(data.hits));
    })
    .then(() => pageNum++)
    .then(() => {
      refs.gallery.scrollIntoView({ block: 'end', behavior: 'smooth' });
      success({ text: `Добавлено больше ответов :)` });
    })
    .catch(err => {
      error({ text: `Возникла ошибка ${err}. Попробуйте ещё` });
    });
}
