/* eslint-disable class-methods-use-this */
import { EventEmitter } from "events";
import FightersView from "./fightersView";
import { fighterService } from "./services/fightersService";
import { fightScene } from "./helpers/createFightView";
import { fight } from "./helpers/fight";
import { Fighter } from "./fighter";

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
          this.oponents.push(fightersView.getFighterDataById(id));
        }
      });

      this.startFightButton.addEventListener(
        "click",
        () => {
          if (this.oponents.length === 2) {
            App.loadingElement.style.visibility = "visible";
            fightScene(App.rootElement, this.oponents);
            App.loadingElement.style.visibility = "hidden";

            fight(new Fighter(this.oponents[0]), new Fighter(this.oponents[1]));
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
