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

function fight(firstFighter, secondFighter) {
  document.addEventListener(
    "keydown",
    e => {
      if (e.keyCode === 70) {
        const damage =
          firstFighter.getHitPower() - secondFighter.getBlockPower();
        secondFighter.health -= damage > 0 ? damage : 0;

        const healthIndicator = document.getElementById(secondFighter._id);
        changeHealthIndicator(
          healthIndicator,
          secondFighter.maxHealth,
          secondFighter.health
        );
      }

      if (e.keyCode === 74) {
        const damage =
          secondFighter.getHitPower() - firstFighter.getBlockPower();
        firstFighter.health -= damage > 0 ? damage : 0;

        const healthIndicator = document.getElementById(firstFighter._id);
        changeHealthIndicator(
          healthIndicator,
          firstFighter.maxHealth,
          firstFighter.health
        );
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
