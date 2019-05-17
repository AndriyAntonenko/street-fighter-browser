const API_URL = 'https://api.github.com/';
const rootElement = document.getElementById('root');
const loadingElement = document.getElementById('loading-overlay');

const fightersDetailsMap = new Map();

async function startApp() {
  try {
    const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
    const fighters = await callApi(endpoint, 'GET');
    console.log(fighters);
    
    const fightersElements = createFighters(fighters);
    rootElement.appendChild(fightersElements);
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

function createName(name) {
  const nameElement = createElement({ tagName: 'span', className: 'name' });
  nameElement.innerText = name;

  return nameElement;
}

function createImage(source) {
  const attributes = { src: source };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-image',
    attributes
  });

  return imgElement;
}

function createFighter(fighter) {
  const { name, source } = fighter;
  const nameElement = createName(name);
  const imageElement = createImage(source);
  const element = createElement({ tagName: 'div', className: 'fighter' });

  element.append(imageElement, nameElement);
  element.addEventListener('click', event => handleFighterClick(event, fighter), false);

  return element;
}

function createFighters(fighters) {
  const fighterElements = fighters.map(fighter => createFighter(fighter));
  const element = createElement({ tagName: 'div', className: 'fighters' });

  element.append(...fighterElements);
  return element;
}

function handleFighterClick(event, fighter) {
  const { _id } = fighter;

  if(!fightersDetailsMap.has(_id)) {
    // send request here
    fightersDetailsMap.set(_id, fighter);
  }

  console.log(fightersDetailsMap.get(_id));
}

const getFightersNames = (fighters) => fighters.map(it => it.name).join('\n');

startApp();
