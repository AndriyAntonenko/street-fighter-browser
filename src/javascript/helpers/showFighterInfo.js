/* eslint-disable no-unused-expressions */
import FighterView from "../fighterView";

const healthInput = document.getElementById("input-health");
const defenseInput = document.getElementById("input-defense");
const attackInput = document.getElementById("input-attack");
const nameField = document.querySelector(".fighter-name");
const fighterImage = document.querySelector(".fighter-info-image img");
const btnSave = document.getElementById("save");
const chooseBtn = document.getElementById("choose-fighter");

function btnClickHandler(e) {
  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  const fighter = {
    health: healthInput.value,
    defense: defenseInput.value,
    attack: attackInput.value
  };

  const _id = e.target.dataset.id;

  window.ee.emit("edit-fighter", _id, fighter);
  document.getElementById("fighter-info").style.visibility = "hidden";
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
    document.getElementById("fighter-info").style.visibility = "hidden";
  };
}

function showFighterInfo(fighter) {
  healthInput.value = fighter.health;
  defenseInput.value = fighter.defense;
  attackInput.value = fighter.attack;
  nameField.innerText = fighter.name;

  fighterImage.setAttribute("src", fighter.source);
  btnSave.setAttribute("data-id", fighter._id);

  btnSave.addEventListener("click", btnClickHandler);
  document.getElementById("fighter-info").style.visibility = "visible";
  chooseBtn.onclick = chooseBtnHandler(fighter);
  chooseBtn.setAttribute("data-id", fighter._id);
}

export { showFighterInfo };
