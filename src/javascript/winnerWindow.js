import { ModalWindow } from "./modalWindow";

class WinnerWindow extends ModalWindow {
  constructor({ fighterName, fighterSource }) {
    super();
    this.fighterName = fighterName;
    this.fighterSource = fighterSource;
  }

  create() {
    return this.createWindow(this.addContent(), { id: "winner-window" });
  }

  addContent() {
    const container = this.createElement({
      tagName: "div",
      className: "winner-container"
    });

    const name = this.createElement({
      tagName: "p",
      className: "fighter-name"
    });
    name.innerText = `${this.fighterName} is win!`.toUpperCase();

    const image = this.createElement({
      tagName: "img",
      className: "fighter-image"
    });
    image.setAttribute("src", this.fighterSource);

    const button = this.createElement({
      tagName: "button",
      className: "menu-return"
    });
    button.addEventListener(
      "click",
      () => {
        window.location.reload();
      },
      false
    );
    button.innerText = "Menu";

    container.appendChild(name);
    container.appendChild(image);
    container.appendChild(button);
    return [container];
  }
}

export { WinnerWindow };
