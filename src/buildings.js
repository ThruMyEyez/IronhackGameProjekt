class StaticBuilding {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.cx = this.x + this.width / 2;
    this.cy = this.y + this.height / 2;
  }
  //update() {}
  //logic() {}
  //draw() {}
}

class BugTower extends StaticBuilding {
  static MAX_HP = 1024;
  constructor(game, x, y, width, height, hp, lvl, AttackRadius) {
    super(game, x, y, width, height);
    this.maxHP = BugTower.MAX_HP;
    this.hp = this.maxHP;
    this.lvl = lvl;
    this.radius = AttackRadius;
    this.fireRate = 3;
    this.dmg = 50;
    this.canAttack = false;
    this.countdown = 0;
    //this.angle = 0;
    this.projectiles = [];
  }
  logic() {
    for (const entity of this.game.entities) {
      const isInRange = isPointInCircle(entity.x, entity.y, this);
      if (isInRange) {
        // console.log("bot in range - can attack");
        this.angle = getAngle(entity, this);

        this.startAttack(entity);

        // console.log(this.angle);
      }
    }

    // event triggers on 0 HP
    if (this.hp <= 0) {
      const idx = this.game.buildings.indexOf(this);
      this.game.buildings.splice(idx, 1);
      //TODO WinGame here if tower defeated.
    }
  }

  update() {
    this.logic();
  }
  draw() {
    this.logic();
    this.game.ctx.save();
    this.game.ctx.fillStyle = "#5aa457";
    this.game.ctx.translate(this.x + 0.5 * this.width, this.y + 0.5 * this.height);
    this.game.ctx.rotate((Math.PI / 180) * this.angle);
    this.game.ctx.translate(-1 * (this.x + 0.5 * this.width), -1 * (this.y + 0.5 * this.height));
    this.game.ctx.fillRect(this.x, this.y, this.width * 1, this.height * 1);
    this.game.ctx.restore();
    this.game.ctx.fillStyle = "rgba(255, 0, 0, 0.25)";
    this.game.ctx.fillRect(this.x, this.y, this.width * 0.9, this.height * 0.9);
    this.game.ctx.save();
    this.game.ctx.translate(this.x + 0.5 * this.width, this.y + 0.5 * this.height);
    this.game.ctx.rotate((Math.PI / 180) * this.angle);
    this.game.ctx.translate(-1 * (this.x + 0.5 * this.width), -1 * (this.y + 0.5 * this.height));
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.cx, this.cy, this.width, 0, 2 * Math.PI);
    this.game.ctx.arc(this.cx, this.cy, this.width / 10, 0, 2 * Math.PI);
    this.game.ctx.closePath();
    this.game.ctx.stroke();
    this.game.ctx.restore();
    this.healthBar();
    for (const bullet of this.projectiles) {
      bullet.draw();
    }
  }
  healthBar() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = "red";
    this.game.ctx.fillRect(this.x, this.y - 6, this.width, 3);
    this.game.ctx.fillStyle = "green";
    this.game.ctx.fillRect(this.x, this.y - 6, (this.hp / this.maxHP) * this.width, 3);
    this.game.ctx.fillStyle = "black";
    this.game.ctx.strokeRect(this.x, this.y - 6, this.width, 3);
    this.game.ctx.restore();
  }
  //Prototype
  startAttack(target) {
    if (this.game.view.frames % (this.game.view.fps / 2) === 0) {
      const attackerIdx = this.game.buildings.indexOf(this);
      const angleRad = getAngleRad(this, target);
      const bullet = new Projectile(this.game, this.cx, this.cy, 1, 1, 10, 10, 30, angleRad, attackerIdx);
      this.projectiles.push(bullet);
    }
  }
}
