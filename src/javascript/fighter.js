class Fighter {
  constructor({ name, health, attack, defense, source }) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.source = source;
  }

  getHitPower() {
    const criticalHitChance = Math.random() + 1;
    return this.attack * criticalHitChance();
  }

  getBlockPower() {
    const dodgeChanse = Math.random() + 1;
    return this.defense * dodgeChanse;
  }
}

export { Fighter };
