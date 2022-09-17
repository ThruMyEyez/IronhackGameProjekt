// TODO|idea, color fading energy bar?
class UI {
  constructor(game) {
    this.game = game;
    this.fpsUI = document.querySelector(".fps span");
    this.energyUI = document.querySelector(".resources .energy-val");
    this.resUI = document.querySelector(".resources .res");
    this.timeUI = document.querySelector(".resources .time");
    this.energyBar = document.querySelector(".bars .energy");
    this.bugsUI = document.querySelector(".bugs span");
    this.botsUI = document.querySelector(".entities span");
    this.followMouseBtn = document.getElementById("follow");
  }

  draw() {
    this.fpsUI.innerText = this.game.view.fps;
    this.energyUI.innerText = `N-RGY: ${this.game.player.energy} / ${this.game.player.maxEnergy}`;
    this.resUI.innerText = `Q-Bits: ${this.game.player.resources} / ${this.game.player.maxResources}`;
    this.timeUI.innerText = `T: ${this.game.time}`;
    //this.fpsUI.style.display = "none";
    this.energyBar.style.width = `${this.game.player.energyAmountPercent()}%`;
    this.bugsUI.innerText = this.game.bugs.length;
    this.botsUI.innerText = this.game.entities.length;
    if (this.game.player.followMouse) {
      this.followMouseBtn.style.color = "orange ";
    } else {
      this.followMouseBtn.style.color = "#ccc";
    }
  }
}
