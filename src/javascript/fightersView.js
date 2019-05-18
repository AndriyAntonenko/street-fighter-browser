import View from "./view";
import FighterView from "./fighterView";
import { fighterService } from "./services/fightersService";
import { showFighterInfo } from "./helpers/showFighterInfo";

class FightersView extends View {
  constructor(fighters) {
    super();

    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
    this.fightersDetailsMap = new Map();
  }

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({
      tagName: "div",
      className: "fighters"
    });
    this.element.append(...fighterElements);
  }

  editFighter(fighterId, fighterInfo) {
    const oldFighterData = this.fightersDetailsMap.get(String(fighterId));
    oldFighterData.health = fighterInfo.health;
    oldFighterData.defense = fighterInfo.defense;
    oldFighterData.attack = fighterInfo.attack;

    this.fightersDetailsMap.delete(fighterId);

    this.fightersDetailsMap.set(fighterId, oldFighterData);
  }

  async handleFighterClick(event, fighter) {
    if (!this.fightersDetailsMap.has(fighter._id)) {
      const fighterDetails = await fighterService.getFigterInfo(fighter._id);
      this.fightersDetailsMap.set(fighterDetails._id, fighterDetails);
    }

    showFighterInfo(this.fightersDetailsMap.get(fighter._id));
  }
}

export default FightersView;
