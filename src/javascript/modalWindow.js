import View from "./view";

class ModalWindow extends View {
  createWindow(inner, attributes) {
    const modalWindow = this.createElement({
      tagName: "div",
      className: "fighter-info",
      attributes
    });

    inner.forEach(element => {
      modalWindow.appendChild(element);
    });

    return modalWindow;
  }
}

export { ModalWindow };
