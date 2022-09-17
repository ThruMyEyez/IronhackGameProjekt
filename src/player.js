class Player {
  constructor(game) {
    this.game = game;
    this.energy = 40;
    this.maxEnergy = 40;
    this.resources = 0;
    this.maxResources = 20;
    this.entityTypes = null;
    this.followMouse = false;
  }

  update() {
    if (this.game.time === 0 && this.game.bugs.length > 0) {
      this.game.lose();
    }
    if (this.game.bugs.length === 0) {
      this.game.win();
    }
  }
  addEnergy(amount) {
    this.energy += amount;
    this.energy = this.energy >= this.maxEnergy ? this.maxEnergy : this.energy;
    // (this.energy >= this.maxEnergy) ?
    //  this.energy = this.maxEnergy;
    //  r;
    //
  }
  rmEnergy(amount) {
    this.energy = this.energy <= 0 ? 0 : this.energy - amount;
  }
  addResource(amount) {
    this.resources += amount;
    this.resources = this.resources >= this.maxResources ? this.maxResources : this.resources;
  }
  rmResource(amount) {
    this.resources = this.resources <= 0 ? 0 : this.resources - amount;
  }
  energyAmountPercent() {
    return (100 * this.energy) / this.maxEnergy;
  }
  countdownPercent() {
    return (100 * this.game.time) / 240;
  }
  //debug() {
  //  console.log("Player object Initialized..");
  //}
}
