const API_KEY = '23081749-b9f3d38fc4718cbd45a8beed9';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export function fetchApi(searchQuery, pageNum) {
  if (searchQuery) {
    return fetch(`${BASE_URL}&q=${searchQuery}&page=${pageNum}&per_page=12&key=${API_KEY}`)
      .then(response => response.json())
      .catch(err => error({ text: `Возникла ошибка ${err}. Попробуйте ещё` }));
  }
}
export function fetchLargeImgUrl(id) {
  return fetch(`${BASE_URL}&id=${id}&key=${API_KEY}`)
    .then(response => response.json())
    .catch(err => error({ text: `Возникла ошибка ${err}. Попробуйте ещё` }));
}
