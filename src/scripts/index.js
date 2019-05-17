const API_URL = 'https://api.github.com/repos/sahanr/street-fighter/contents/fighters.json';

fetch(API_URL)
  .then(response => response.json())
  .then(file => {
    const fighters = JSON.parse(atob(file.content));
    console.log(fighters);
  });
