/* eslint-disable no-unused-expressions */
import FighterView from "../fighterView";

const healthInput = document.getElementById("input-health");
const defenseInput = document.getElementById("input-defense");
const attackInput = document.getElementById("input-attack");
const nameField = document.querySelector(".fighter-name");
const fighterImage = document.querySelector(".fighter-info-image img");
const btnSave = document.getElementById("save");
const chooseBtn = document.getElementById("choose-fighter");
const closeBtn = document.getElementById("close-window");

function editFighter(id) {
  const fighter = {
    health: healthInput.value,
    defense: defenseInput.value,
    attack: attackInput.value
  };

  window.ee.emit("edit-fighter", id, fighter);
}

function btnClickHandler(fighter) {
  return e => {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);

    editFighter(fighter._id);
    document.getElementById("fighter-info").style.visibility = "hidden";
  };
}

function chooseBtnHandler(fighter) {
  return e => {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    const firstFighterElement = document.getElementById("first-fighter");
    const secondFighterElement = document.getElementById("second-fighter");

    if (!firstFighterElement.childNodes.length) {
      const fighterElement = new FighterView(fighter);
      firstFighterElement.appendChild(fighterElement.element);
    } else if (!secondFighterElement.childNodes.length) {
      const fighterElement = new FighterView(fighter);
      secondFighterElement.appendChild(fighterElement.element);
    }

    editFighter(fighter._id);
    window.ee.emit("choose-fighter", fighter._id);
    document.getElementById("fighter-info").style.visibility = "hidden";
  };
}

function closeBtnHandler() {
  document.getElementById("fighter-info").style.visibility = "hidden";
}

function showFighterInfo(fighter) {
  healthInput.value = fighter.health;
  defenseInput.value = fighter.defense;
  attackInput.value = fighter.attack;
  nameField.innerText = fighter.name;

  fighterImage.setAttribute("src", fighter.source);

  document.getElementById("fighter-info").style.visibility = "visible";

  btnSave.onclick = btnClickHandler(fighter);
  chooseBtn.onclick = chooseBtnHandler(fighter);
  closeBtn.onclick = closeBtnHandler;
}

export { showFighterInfo };
