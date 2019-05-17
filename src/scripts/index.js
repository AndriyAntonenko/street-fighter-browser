const API_URL = 'https://api.github.com/repos/sahanr/street-fighter/contents/fighters.json';

const rootElement = document.getElementById('root');
const loadingElement = document.getElementById('loading-overlay');

fetch(API_URL)
  .then(response => { 
    if( !response.ok ) {
      return Promise.resolve(new Error('Filed rto load data...'));
    }
    return response.json() 
  })
  .then(file => {
    console.log(file);
    
    const fighters = JSON.parse(atob(file.content));
    const names = fighters.map(fighter => fighter.name).join('\n');
    rootElement.innerText = names;
  })
  .catch(err => {
    console.warn(err);
    rootElement.innerText = err.message;
  })
  .finally(() => {
    loadingElement.remove();
  });
