const API_TOKEN = '2580affb7e89bf060247c31e29f0c061';

export function getFilmsWithSearchText(text, page) {
  const url =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    API_TOKEN +
    '&language=fr&query=' +
    text +
    '&page=' +
    page;

  console.log('====================================');
  console.log(url);
  console.log('====================================');

  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export function getImage(name) {
  return 'https://image.tmdb.org/t/p/w500' + name;
}
