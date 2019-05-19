/* eslint-disable class-methods-use-this */
import { EventEmitter } from "events";
import FightersView from "./fightersView";
import { fighterService } from "./services/fightersService";
import { Fighter } from "./fighter";
import { fight } from "./helpers/fight";

window.ee = new EventEmitter();

class App {
  constructor() {
    this.oponents = [];
    this.startApp();
    this.startFightButton = document.getElementById("start");
  }

  static rootElement = document.getElementById("root");

  static loadingElement = document.getElementById("loading-overlay");

  async startApp() {
    try {
      App.loadingElement.style.visibility = "visible";

      const fighters = await fighterService.getFighters();

      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element;

      App.rootElement.appendChild(fightersElement);

      window.ee.on("edit-fighter", (_id, fighter) => {
        fightersView.editFighter(_id, fighter);
      });
      window.ee.on("choose-fighter", id => {
        if (this.oponents.length < 2) {
          this.oponents.push(new Fighter(fightersView.getFighterDataById(id)));
        }
      });

      this.startFightButton.addEventListener(
        "click",
        () => {
          if (this.oponents.length === 2) {
            App.loadingElement.style.visibility = "visible";
            fight();
            App.loadingElement.style.visibility = "hidden";
          }
        },
        false
      );
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = "Failed to load data";
    } finally {
      App.loadingElement.style.visibility = "hidden";
    }
  }
}

export default App;
