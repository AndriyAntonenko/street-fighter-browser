import { FightView } from "../fightView";

function createFightView(fighters) {
  const fightView = new FightView(fighters);
  return fightView.createFightView();
}

function fightScene(root, fighters) {
  const rootElement = document.getElementById("root");
  rootElement.style.background =
    "url('../../resources/fight-background.png') no-repeat";

  const [fightMenuElement, fightersElement] = [
    document.querySelector(".fight-menu"),
    document.querySelector(".fighters")
  ];

  fightMenuElement.style.display = "none";
  fightersElement.style.display = "none";

  root.appendChild(createFightView(fighters));
}

export { fightScene };
