import View from "./view";
import FighterView from "./fighterView";

class FightView extends View {
  constructor(fighters) {
    super();
    this.fighters = fighters;
    this.helpInfo = this.createHelpInfo();
  }

  createFightView() {
    const fightView = this.createElement({
      tagName: "div",
      className: "fight"
    });

    fightView.appendChild(this.createFirstFighter());
    fightView.appendChild(this.createSecondFighter());
    this.panchesSound();

    return fightView;
  }

  createFirstFighter() {
    const firstFighterBlock = this.createElement({
      tagName: "div",
      className: "first-fighter-block"
    });
    const healthIndicator = this.createHealthIndicator(this.fighters[0]._id);

    const firstFighterImage = new FighterView(this.fighters[0]).createImage(
      this.fighters[0].source
    );
    firstFighterImage.classList.add("fight-fighter-img");

    firstFighterBlock.appendChild(healthIndicator);
    firstFighterBlock.appendChild(this.helpInfo.helpFirstFighter);
    firstFighterBlock.appendChild(firstFighterImage);

    return firstFighterBlock;
  }

  createSecondFighter() {
    const secondFighterBlock = this.createElement({
      tagName: "div",
      className: "second-fighter-block"
    });
    const healthIndicator = this.createHealthIndicator(this.fighters[1]._id);

    const secondFighterImage = new FighterView(this.fighters[1]).createImage(
      this.fighters[1].source
    );
    secondFighterImage.classList.add("fight-fighter-img");

    secondFighterBlock.appendChild(healthIndicator);
    secondFighterBlock.appendChild(this.helpInfo.helpSecondFighter);
    secondFighterBlock.appendChild(secondFighterImage);

    return secondFighterBlock;
  }

  createHealthIndicator(fighterId) {
    const indicator = this.createElement({
      tagName: "div",
      className: "health-indicator",
      attributes: { id: fighterId }
    });

    const healthes = this.createElement({
      tagName: "div",
      className: "fighter-health"
    });

    const healthesLost = this.createElement({
      tagName: "div",
      className: "fighter-health-lost"
    });

    indicator.appendChild(healthes);
    indicator.appendChild(healthesLost);
    return indicator;
  }

  createHelpInfo() {
    const helpFirstFighter = this.createElement({
      tagName: "p",
      className: "help-info"
    });
    helpFirstFighter.innerText = "Press 'F' to hit";

    const helpSecondFighter = this.createElement({
      tagName: "p",
      className: "help-info"
    });
    helpSecondFighter.innerText = "Press 'J' to hit";

    setTimeout(() => {
      helpFirstFighter.parentNode.removeChild(helpFirstFighter);
      helpSecondFighter.parentNode.removeChild(helpSecondFighter);
    }, 5000);

    return { helpFirstFighter, helpSecondFighter };
  }

  panchesSound() {
    const audioRoutes = [
      "./resources/audio/panches/2AH.wav",
      "./resources/audio/panches/2BH.wav",
      "./resources/audio/panches/2CH.wav",
      "./resources/audio/panches/2DH.wav",
      "./resources/audio/panches/2EH.wav"
    ];

    audioRoutes
      .map(route => {
        return this.createElement({
          tagName: "audio",
          className: "panch",
          attributes: { src: route, hidden: true }
        });
      })
      .forEach(audio => {
        document.getElementById("root").appendChild(audio);
      });
  }
}

export { FightView };
