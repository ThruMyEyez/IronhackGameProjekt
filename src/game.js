//TODO bug building should shoot simple projectiles at Bots.
//TODO Create Power Ups like hp and dmg multiplier, faster bots. Which could be bought with "resources".
class Game {
  constructor(gameOverScreenElement, gameWinScreenElement, bugAmount, mapW, mapH) {
    this.gameOverScreenElement = gameOverScreenElement;
    this.gameWinScreenElement = gameWinScreenElement;
    this.bugAmount = bugAmount;
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.time = 240;
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
    this.map = new Map(this, mapW, mapH, tileObjects);
    this.player = new Player(this);
    //Init game functions
    this.keyboard.input();
    this.mouse.input();
    const tower = new BugTower(this, 600, 600, 88, 88, 1000, 1, 160);
    //* Populate the map with bugs.
    for (let i = 0; i < this.bugAmount; i++) {
      const mapX = mapW * this.map.tSize;
      const mapY = mapH * this.map.tSize;
      const randomX = mapX => {
        return Math.floor(Math.random() * mapX) - this.map.tSize;
      };
      const randomY = mapY => {
        return Math.floor(Math.random() * mapY) - this.map.tSize * 2;
      };
      console.log(mapW, mapH, this.bugAmount, mapW * this.map.tSize);
      console.log(randomX(mapX));
      const bug = new Bug(
        this,
        clamp(randomX(mapX), [this.map.tSize * 2, mapW * this.map.tSize - this.map.tSize * 2]),
        clamp(randomY(mapY), [this.map.tSize * 3, mapH * this.map.tSize - this.map.tSize * 2]),
        16,
        16,
        0.8,
        0.8
      );
      this.bugs.push(bug);
    }

    this.buildings.push(tower);
    this.view.draw();
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
  lose() {
    console.log("lose");
    this.gameOverScreenElement.style.display = "";
    this.gameStopped = true;
  }
  win() {
    console.log("win");
    playWinAudio();
    this.gameStopped = true;
    this.gameWinScreenElement.style.display = "";
  }
}
