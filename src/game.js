//TODO create only one stationary building for humans, which is OP but must be defeated to win game.
//TODO human building should shoot simple projectiles at Bots.
//TODO Create Power Ups like hp and dmg multiplier, faster bots. Which could be bought with "resources".
// TODO so you should have a main mobil entity class and human "tower" building like in tower defense games.
class Game {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.time = 0;
    this.init();
  }
  init() {
    console.log("initialize game...");
    this.newGame();
    //Init the game components classes
    this.view = new View(this);
    this.mouse = new Mouse(this);
    this.ui = new UI(this);
    this.map = new Map(this, 60, 70, tileObjects);
    this.player = new Player(this);
    //Init game functions
    this.mouse.input();
    this.view.draw();
    //? Debug entity
    const bot = new Bot(this, 260, 160, 25, 25);
    this.entities.push(bot);
  }
  newGame() {
    this.gameStopped = false;
    this.obstacles = [];
    this.human = [];
    this.projectiles = [];
    this.entities = [];
  }

  pauseGame() {
    console.log(1);
    if (!this.gameStopped) {
      this.gameStopped = true;
    } else {
      this.gameStopped = false;
      this.view.draw();
    }
  }
  deployEntity() {
    //TODO Check which entity Type is selected before deploy on map
    //TODO TODO create second entity class from first
    if (this.mouse.isOnMap && this.player.energy >= Bot.COST && !this.mouse.onObstacle) {
      //TODO render entity on map at mouse position before spawn to preview draw it);
      const entity = new Bot(this, this.mouse.x, 300, 16, 16); //!! ❓🎯 Bug with this.mouse.y 🤦 ❓
      this.player.energy -= entity.cost;
      this.entities.push(entity);
      console.log("Bot deployed on Map!");
    }
  }
}
