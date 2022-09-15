//TODO bug building should shoot simple projectiles at Bots.
//TODO Create Power Ups like hp and dmg multiplier, faster bots. Which could be bought with "resources".
class Game {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.time = 0;
    this.init();
  }
  init() {
    //TODO Refactor here after Debug and Prototype
    this.newGame();
    //Init the game components classes
    this.view = new View(this);
    this.mouse = new Mouse(this);
    this.keyboard = new Keyboard(this);
    this.ui = new UI(this);
    this.map = new Map(this, 80, 90, tileObjects);
    this.player = new Player(this);
    //Init game functions
    this.keyboard.input();
    this.mouse.input();
    this.view.draw();
    const tower = new BugTower(this, 500, 500, 88, 88, 1000, 1, 160);
    //? Debug entity
    const bug = new Bug(this, 420, 450, 16, 16, 0.8, 0.8);
    const bug2 = new Bug(this, 820, 650, 16, 16, 0.8, 0.8);
    this.buildings.push(tower);
    this.bugs.push(bug);
    this.bugs.push(bug2);
  }
  newGame() {
    this.gameStopped = false;
    // this.debris = [];
    this.obstacles = [];
    this.buildings = [];
    this.bugs = [];
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
    if (this.mouse.isOnMap && this.player.energy >= Bot.COST && !this.mouse.onObstacle && !this.player.followMouse) {
      //TODO render entity on map at mouse position before spawn to preview draw it);
      const entity = new Bot(this, this.mouse.x, this.mouse.y, 16, 16);
      this.player.energy -= entity.cost;
      this.entities.push(entity);
      console.log("Bot deployed on Map!");
    }
  }
}
