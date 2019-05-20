/* eslint-disable no-unused-expressions */
import { ModalWindow } from "./modalWindow";
import FighterView from "./fighterView";

class FighterInfoWindow extends ModalWindow {
  constructor(fighter) {
    super();
    this.fighter = fighter;
    this.paramLabels = ["Health", "Defense", "Attack"];
  }

  create() {
    this.fighterWindow = this.createWindow(this.addContent(), {});
    return this.fighterWindow;
  }

  addContent() {
    const container = this.createElement({
      tagName: "div",
      className: "fighter-info-container"
    });

    container.appendChild(this.addFighterImage());
    container.appendChild(this.addFighterInfo());
    container.appendChild(this.createCloseBtn());

    return [container];
  }

  createCloseBtn() {
    const closeBtn = this.createElement({
      tagName: "span",
      attributes: { id: "close-window" }
    });
    closeBtn.innerHTML = "&#10006;";

    closeBtn.addEventListener("click", () => {
      document.getElementById("root").removeChild(this.fighterWindow);
    });

    return closeBtn;
  }

  addFighterImage() {
    const imageBlock = this.createElement({
      tagName: "div",
      className: "fighter-info-image"
    });

    const image = this.createElement({
      tagName: "img",
      className: "fighter-info-image",
      attributes: { src: this.fighter.source, alt: "FighterImage" }
    });

    imageBlock.appendChild(image);
    return imageBlock;
  }

  addFighterInfo() {
    const infoBlock = this.createElement({
      tagName: "div",
      className: "fighter-info-form"
    });

    const form = this.createElement({
      tagName: "from"
    });
    form.appendChild(this.createFighterName());
    form.appendChild(this.createTable());

    infoBlock.appendChild(form);

    return infoBlock;
  }

  createFighterName() {
    const name = this.createElement({
      tagName: "p",
      className: "fighter-name"
    });
    name.innerText = this.fighter.name;

    return name;
  }

  createTable() {
    const table = this.createElement({
      tagName: "table"
    });
    const tbody = this.createElement({
      tagName: "tbody"
    });

    this.createInputsFields().forEach(input => {
      tbody.appendChild(input);
    });
    tbody.appendChild(this.createBtnSave());
    tbody.appendChild(this.createBtnChoose());
    table.appendChild(tbody);

    return table;
  }

  createInputsFields() {
    const rows = this.paramLabels.map(label => {
      const tr = this.createElement({ tagName: "tr" });
      const [td1, td2] = [
        this.createElement({ tagName: "td" }),
        this.createElement({ tagName: "td" })
      ];

      const spanLabel = this.createElement({
        tagName: "span",
        className: "param-label"
      });
      spanLabel.innerText = `${label}: `;
      td1.appendChild(spanLabel);

      const inputField = this.createElement({
        tagName: "input",
        attributes: {
          type: "number",
          id: `input-${label.toLowerCase()}`,
          value: this.fighter[label.toLowerCase()]
        }
      });

      td2.appendChild(inputField);

      tr.appendChild(td1);
      tr.appendChild(td2);

      return tr;
    });

    return rows;
  }

  createBtnSave() {
    const tr = this.createElement({ tagName: "tr" });
    const [td1, td2] = [
      this.createElement({ tagName: "td" }),
      this.createElement({ tagName: "td" })
    ];

    const button = this.createElement({
      tagName: "button",
      className: "btn",
      attributes: { id: "save" }
    });
    button.innerText = "Save";
    button.addEventListener("click", e => {
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);

      this.editFighter();
      document.getElementById("root").removeChild(this.fighterWindow);
    });
    td2.appendChild(button);

    tr.appendChild(td1);
    tr.appendChild(td2);

    return tr;
  }

  createBtnChoose() {
    const tr = this.createElement({ tagName: "tr" });
    const [td1, td2] = [
      this.createElement({ tagName: "td" }),
      this.createElement({ tagName: "td" })
    ];

    const button = this.createElement({
      tagName: "button",
      className: "btn",
      attributes: { id: "choose-fighter" }
    });
    button.innerText = "Choose";

    button.addEventListener("click", e => {
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      const firstFighterElement = document.getElementById("first-fighter");
      const secondFighterElement = document.getElementById("second-fighter");

      if (!firstFighterElement.childNodes.length) {
        const fighterElement = new FighterView(this.fighter);
        firstFighterElement.appendChild(fighterElement.element);
      } else if (!secondFighterElement.childNodes.length) {
        const fighterElement = new FighterView(this.fighter);
        secondFighterElement.appendChild(fighterElement.element);
      }

      this.editFighter();
      window.ee.emit("choose-fighter", this.fighter._id);
      document.getElementById("root").removeChild(this.fighterWindow);
    });

    td2.appendChild(button);

    tr.appendChild(td1);
    tr.appendChild(td2);

    return tr;
  }

  editFighter() {
    const fighter = {
      health: document.getElementById("input-health").value,
      defense: document.getElementById("input-defense").value,
      attack: document.getElementById("input-attack").value
    };

    window.ee.emit("edit-fighter", this.fighter._id, fighter);
  }
}

export { FighterInfoWindow };
