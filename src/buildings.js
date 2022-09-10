class StaticBuilding {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  update() {}
  logic() {}
  draw() {}
}

class BugTower extends StaticBuilding {
  constructor(game, x, y, width, height, hp, lvl, AttackRadius) {
    super(game, x, y, width, height);
    this.hp = hp;
    this.lvl = lvl;
    this.radius = AttackRadius;
    this.fireRate = 3;
    this.dmg = 50;
    this.canAttack = false;
    this.countdown = 0;
    this.cx = this.x + this.width / 2;
    this.cy = this.y + this.height / 2;
    this.angle = 0;
  }
  logic() {
    for (const entity of this.game.entities) {
      const entityInRange = isPointInCircle(entity.x, entity.y, this);
      if (entityInRange) {
        console.log("bot in range - can attack");
        this.angle = getAngle(entity, this);
        console.log(this.angle);
      }
    }

    // event triggers on 0 HP
    if (this.hp <= 0) {
      this.removeEntity();
      const idx = this.game.buildings.indexOf(this);
      this.game.entities.splice(idx, 1);
      //TODO WinGame here if tower defeated.
    }
  }

  update() {
    this.logic();
  }
  draw() {
    this.update();
    this.game.ctx.save();
    //this.game.ctx.fillStyle = "#500457";
    this.game.ctx.font = "16px serif";
    this.game.ctx.fillText(`HP: ${this.hp}`, this.x, this.y);
    this.game.ctx.fillStyle = "#5aa457";
    this.game.ctx.translate(this.x + 0.5 * this.width, this.y + 0.5 * this.height);
    this.game.ctx.rotate((Math.PI / 180) * this.angle);
    this.game.ctx.translate(-1 * (this.x + 0.5 * this.width), -1 * (this.y + 0.5 * this.height));
    this.game.ctx.fillRect(this.x, this.y, this.width * 1, this.height * 1);
    // this.game.ctx.fillRect(this.x + this.width / 2, this.y + this.height / 2, this.width * 0.9, this.height * 0.9);
    this.game.ctx.restore();
  }
}
