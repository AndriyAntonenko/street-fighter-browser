/* eslint-disable class-methods-use-this */
import { EventEmitter } from "events";
import FightersView from "./fightersView";
import { fighterService } from "./services/fightersService";

window.ee = new EventEmitter();

class App {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById("root");

  static loadingElement = document.getElementById("loading-overlay");

  async startApp() {
    try {
      App.loadingElement.style.visibility = "visible";

      const fighters = await fighterService.getFighters();

      const fightersView = new FightersView(fighters);
      window.ee.on("edit-fighter", (_id, fighter) => {
        fightersView.editFighter(_id, fighter);
      });
      const fightersElement = fightersView.element;

      App.rootElement.appendChild(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = "Failed to load data";
    } finally {
      App.loadingElement.style.visibility = "hidden";
    }
  }
}

export default App;
