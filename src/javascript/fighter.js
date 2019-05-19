class Fighter {
  constructor({ _id, name, health, attack, defense, source }) {
    this._id = _id;
    this.name = name;
    this.maxHealth = health;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.source = source;
  }

  getHitPower() {
    const criticalHitChance = Math.random() + 1;

    return Math.ceil(this.attack * criticalHitChance);
  }

  getBlockPower() {
    const dodgeChanse = Math.random() + 1;

    return Math.ceil(this.defense * dodgeChanse);
  }
}

export { Fighter };
