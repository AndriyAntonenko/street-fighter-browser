const API_URL = 'https://api.github.com/';
const rootElement = document.getElementById('root');
const loadingElement = document.getElementById('loading-overlay');

async function startApp() {
  try {
    const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
    const fighters = await callApi(endpoint, 'GET');
    rootElement.innerText = getFightersNames(fighters);
  } catch (error) {
    console.warn(error);
    rootElement.innerText = 'Failed to load data';
  } finally {
    loadingElement.style.visibility = 'hidden';
  }
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
      throw error;
    })
    .finally(() => {
      loadingElement.remove();
    });
}

function createElement({ tagName, className = '', attributes = {} }) {
  const element = document.createElement(tagName);
  element.classList.add(className);


  Object
    .keys(attributes)
    .forEach(key => element.setAttribute(key, attributes[key]));
  
    return element;
}

const getFightersNames = (fighters) => fighters.map(it => it.name).join('\n');

startApp();
