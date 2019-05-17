const API_URL = 'https://api.github.com/';
const rootElement = document.getElementById('root');
const loadingElement = document.getElementById('loading-overlay');

async function startApp() {
  const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
  const fighters = await callApi(endpoint, 'GET');
  rootElement.innerText = getFightersNames(fighters);
}

function callApi(endpoind, method) {
  const url = API_URL + endpoind;
  const options = {
    method
  };

  return fetch(url, options)
    .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to load')))
    .then(file => JSON.parse(atob(file.content)))
    .catch(error => {
      console.warn(error);
      rootElement.innerText = 'Failed to load data';
    })
    .finally(() => {
      loadingElement.remove();
    });
}

const getFightersNames = (fighters) => fighters.map(it => it.name).join('\n');

startApp();