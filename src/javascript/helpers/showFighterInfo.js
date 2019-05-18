/* eslint-disable no-unused-expressions */
const healthInput = document.getElementById("input-health");
const defenseInput = document.getElementById("input-defense");
const attackInput = document.getElementById("input-attack");
const nameField = document.querySelector(".fighter-name");
const fighterImage = document.querySelector(".fighter-info-image img");
const btnSave = document.querySelector(".btn-save");

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

function showFighterInfo(fighter) {
  healthInput.value = fighter.health;
  defenseInput.value = fighter.defense;
  attackInput.value = fighter.attack;
  nameField.innerText = fighter.name;
  fighterImage.setAttribute("src", fighter.source);

  btnSave.setAttribute("data-id", fighter._id);
  btnSave.addEventListener("click", btnClickHandler);
  document.getElementById("fighter-info").style.visibility = "visible";
}

export { showFighterInfo };
