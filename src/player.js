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
  spawn() {
    if (pointInRect(this.game.mouse.x, this.game.mouse.y, this.game.map) && this.energy >= Bot.COST && !this.player.followMouse) {
      //TODO render entity on map at mouse position before spawn
      const entity = new Bot(this.game, this.game.mouse.x, this.game.mouse.y, 16, 16);
      this.energy -= entity.cost;
      this.game.entities.push(entity);
      console.log("Bot deployed on Maaaap!");
    }
  }
  update() {
    //🤦🤦🤦⚠️⚠️
    //this.addEnergy(5);
    // ###
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
  debug() {
    console.log("Player object Initialized..");
  }
}
