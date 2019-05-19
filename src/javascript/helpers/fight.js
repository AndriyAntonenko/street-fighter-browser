import View from "../view";
import { WinnerWindow } from "../winnerWindow";

function changeHealthIndicator(indicator, maxHealth, health) {
  let healthInProsents = (health * 100) / maxHealth;

  if (health < 0) {
    healthInProsents = 0;
  }

  const healthBlock = indicator.childNodes[0];
  const healthLostBlock = indicator.childNodes[1];

  healthBlock.style.width = `${healthInProsents}%`;
  healthLostBlock.style.width = `${100 - healthInProsents}`;
}

function showWinnerWindow(winner) {
  const winnerWindow = new WinnerWindow(winner).create();
  winnerWindow.style.visibility = "visible";
  document.getElementById("root").appendChild(winnerWindow);
}

function createPanchImage(className) {
  const root = document.getElementById("root");
  const oldPanchImage = document.getElementById("panch-efect");
  if (oldPanchImage) {
    root.removeChild(oldPanchImage);
  }
  const panchImage = new View().createElement({
    tagName: "img",
    className,
    attributes: { id: "panch-efect", src: "./resources/panch.png" }
  });

  root.appendChild(panchImage);
  setTimeout(() => {
    const image = document.getElementById("panch-efect");
    if (image) {
      root.removeChild(image);
    }
  }, 500);
}

function fight(firstFighter, secondFighter) {
  document.getElementById("main-theme").pause();
  document.addEventListener(
    "keydown",
    e => {
      const panchesSounds = document.querySelectorAll(".panch");
      const randomNumber = Math.ceil(Math.random() * 4);
      if (e.keyCode === 70) {
        const damage =
          firstFighter.getHitPower() - secondFighter.getBlockPower();
        secondFighter.health -= damage > 0 ? damage : 0;
        panchesSounds[randomNumber].play();

        const healthIndicator = document.querySelector(
          `.second-fighter-block .health-indicator`
        );
        changeHealthIndicator(
          healthIndicator,
          secondFighter.maxHealth,
          secondFighter.health
        );
        createPanchImage("panch-first-efect");
      }

      if (e.keyCode === 74) {
        const damage =
          secondFighter.getHitPower() - firstFighter.getBlockPower();
        firstFighter.health -= damage > 0 ? damage : 0;
        panchesSounds[randomNumber].play();

        const healthIndicator = document.querySelector(
          `.first-fighter-block .health-indicator`
        );
        changeHealthIndicator(
          healthIndicator,
          firstFighter.maxHealth,
          firstFighter.health
        );
        createPanchImage("panch-second-efect");
      }

      const winner = {};

      if (firstFighter.health <= 0) {
        winner.fighterName = secondFighter.name;
        winner.fighterSource = secondFighter.source;
        showWinnerWindow(winner);
      }

      if (secondFighter.health <= 0) {
        winner.fighterName = firstFighter.name;
        winner.fighterSource = firstFighter.source;
        showWinnerWindow(winner);
      }
    },
    false
  );
}

export { fight };
