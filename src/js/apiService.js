import { refs } from './refs';

const API_KEY = '23081749-b9f3d38fc4718cbd45a8beed9';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export function fetchApi(searchQuery, pageNum) {
  return fetch(`${BASE_URL}&q=${searchQuery}&page=${pageNum}&per_page=12&key=${API_KEY}`)
    .then(response => response.json())
    .catch(err => console.log('err', err));
}
