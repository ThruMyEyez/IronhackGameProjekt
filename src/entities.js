//const chara = new Image();
//chara.src = "/assets/images/blocky_dungeon.png";

class MobileEntity {
  constructor(game, x, y, width, height, speedX, speedY) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX || 0;
    this.speedY = speedY || 0;
    this.cx = this.x + this.width / 2;
    this.cy = this.y + this.height / 2;
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
}

class Bot extends MobileEntity {
  static COST = 5;
  static MAX_HP = 121;
  static DMG = 9;
  static ATTRACTION_RADIUS = 100;
  static ATTACK_DISTANCE = 10;
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);
    this.speed = 1;
    this.rotation = 0; // || Math.atan2(this.game.mouse.y - this.y, this.game.mouse.x - this.x);
    this.angle = 0;
    this.cost = Bot.COST * 1;
    this.maxHP = Bot.MAX_HP * 1;
    this.damage = Bot.DMG * 1;
    this.hp = this.maxHP;
    this.wayPoints = [];
    this.noticedBugs = [];
    this.isSearching = true;
  }
  checkObstacleCollision() {
    for (const obstacle of this.game.obstacles) {
      //*check x axis
      if (
        this.x + this.width + this.speedX > obstacle.x &&
        this.x + this.speedX < obstacle.x + obstacle.width &&
        this.x + this.height > obstacle.y &&
        this.y < obstacle.y + obstacle.height
      ) {
        console.log("collision x");
        this.speedX *= -1;
      }
      //*check y axis
      if (
        this.x + this.width > obstacle.x &&
        this.x < obstacle.x + obstacle.width &&
        this.y + this.height + this.speedY > obstacle.y &&
        this.y + this.height < obstacle.y + obstacle.height
      ) {
        this.speedY *= -1;
      }
      //const isCollision = rectInRect(this, obstacle);
      //if (isCollision) {
      //  console.log(`Bot on obstacle with id: ${obstacle.id}`);
      //  this.angle = 1; // for testing
      //}
    }
  }

  getRandomCoords(mapObj) {
    // Takes the game.map obj and returns tile coords in x & y
    const randomRow = clamp(Math.floor(Math.random() * mapObj.mapW) * this.game.map.tSize, [
        this.game.map.tSize,
        mapObj.mapW * this.game.map.tSize - this.game.map.tSize,
      ]),
      randomCol = clamp(Math.floor(Math.random() * mapObj.mapH) * this.game.map.tSize, [
        this.game.map.tSize * 2,
        mapObj.mapH * this.game.map.tSize - this.game.map.tSize,
      ]);
    const wayPoint = {
      x: randomRow,
      y: randomCol,
      isBugWP: false,
      centerR: { cx: randomRow + this.game.map.tSize / 2, cy: randomCol + this.game.map.tSize / 2, radius: this.game.map.tSize },
    };
    this.wayPoints.push(wayPoint);
  }

  removeEntity() {
    // event triggers on 0 HP
    const idx = this.game.entities.indexOf(this);
    this.game.entities.splice(idx, 1);
  }
  moveLogic() {
    if (!this.isSearching) {
    }
    if (this.game.player.followMouse) {
      // follow mouse
      for (let i = 0; i < this.wayPoints.length; i++) {
        this.wayPoints.pop();
      }
      this.chaseMouse();
    } else if (this.wayPoints.length === 0 && this.isSearching) {
      this.getRandomCoords(this.game.map);
    } else if (this.wayPoints.length > 0) {
      this.moveToWaypoint(0);
      if (isPointInCircle(this.x, this.y, this.wayPoints[0].centerR) && !this.wayPoints[0].isBugWP) {
        this.wayPoints.shift();
      }
    }
  }
  checkNearBugs() {
    this.radius = Bot.ATTRACTION_RADIUS * 1; //1 as placeholder for Multiplier upgrade.
    this.cx = this.x + this.width / 2;
    this.cy = this.y + this.height / 2;
    //* Follow and attack bugs
    this.game.bugs.forEach(bug => {
      const isBugNear = isPointInCircle(bug.cx, bug.cy, this);
      if (isBugNear && this.noticedBugs < 1) {
        this.isSearching = false;
        this.noticedBugs.push(bug);
        const bugWP = {
          x: bug.x,
          y: bug.y,
          isBugWP: true,
          gameIdx: this.game.bugs.indexOf(bug),
          centerR: { cx: bug.x + bug.width / 2, cy: bug.y + bug.height / 2, radius: 16 },
        };
        this.wayPoints.push(bugWP);
      }
    });
  }
  attack() {
    // const { isSearching, noticedBugs, wayPoints } = this;
    this.attackRate = 1;
    for (const bug of this.noticedBugs) {
      const contact = rectInRect(this, bug);
      if (contact && this.game.view.frames % (this.game.view.fps / this.attackRate) === 0) {
        console.log("attack true");
        bug.hp -= this.damage;
      }
      if (bug.hp <= 0) {
        const idxBug = this.noticedBugs.indexOf(bug);
        this.noticedBugs.splice(idxBug, 1);
        this.wayPoints.shift();
      }
    }
    //if ((!this.isSearching && this.noticedBugs.length > 0, this.wayPoints.isBugWP)) {
    //}
  }
  processLogic() {
    this.radius = Bot.ATTRACTION_RADIUS;
    this.checkNearBugs();
    if (!this.isSearching && this.noticedBugs.length > 0) {
      this.attack();
    }
    if (this.hp <= 0) {
      this.removeEntity();
    }
  }
  draw() {
    this.processLogic();
    this.moveLogic();
    this.drawWaypoint();
    this.healthBar();
    this.x += this.speedX;
    this.y += this.speedY;
    this.game.ctx.save();
    this.game.ctx.fillStyle = "yellow";
    this.game.ctx.translate(this.x + 0.5 * this.width, this.y + 0.5 * this.height);
    this.game.ctx.rotate((Math.PI / 180) * this.angle);
    this.game.ctx.translate(-1 * (this.x + 0.5 * this.width), -1 * (this.y + 0.5 * this.height));
    this.game.ctx.fillRect(this.x, this.y, this.width * 1, this.height * 1);
    this.game.ctx.restore();
  }
  chaseMouse() {
    //* Distance to x and to y of mouse
    this.dx = this.game.mouse.x - this.x;
    this.dy = this.game.mouse.y - this.y;
    const length = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    this.dx = this.dx / length;
    this.dy = this.dy / length;
    // Move to game.mouse x|y coords
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
    // Rotate to game.mouse x|y coords
    this.angle = getAngle(this.game.mouse, this);
    //followObj(this, this.game.mouse);
  }
  moveToWaypoint(wpIdx) {
    //move to idx of waypoint in arr or go to first element in arr
    const wp = wpIdx || 0;
    this.dx = this.wayPoints[wp].x - this.x;
    this.dy = this.wayPoints[wp].y - this.y;
    const hypot = Math.sqrt(this.dx ** 2, this.dy ** 2);
    this.dx = this.dx / hypot;
    this.dy = this.dy / hypot;
    //this.x += Math.cos(this.rotation) * this.speed;
    //this.y += Math.sin(this.rotation) * this.speed;
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
    this.angle = getAngle(this.wayPoints[wp], this);
  }
  teleportToWaypoint() {
    //teleport to first WP in arr
    this.dx = this.wayPoints[0].x - this.x;
    this.dy = this.wayPoints[0].y - this.y;
    const length = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
    this.angle = getAngle(this.wayPoints[0], this);
  }
  drawWaypoint() {
    // FOR DEBUG // It is invisible
    for (const point of this.wayPoints) {
      this.game.ctx.save();
      this.game.ctx.beginPath();
      this.game.ctx.arc(point.centerR.cx, point.centerR.cy, this.game.map.tSize, 0, 2 * Math.PI);
      this.game.ctx.stroke();
      this.game.ctx.restore();
    }
  }
}

class Bug extends MobileEntity {
  static MAX_HP = 40;
  static DMG = 10;
  static ATTACK_DISTANCE = 4;
  constructor(game, x, y, width, height, speedX, speedY, damage) {
    super(game, x, y, width, height, speedX, speedY);
    this.maxHP = Bug.MAX_HP;
    this.hp = this.maxHP;
  }
  logic() {
    if (this.hp <= 0) {
      this.removeEntity();
    }
  }
  update() {
    this.logic();
  }
  draw() {
    this.update();
    this.healthBar();
    this.testDraw();
  }
  removeEntity() {
    // event triggers on 0 HP
    const idx = this.game.bugs.indexOf(this);
    this.game.bugs.splice(idx, 1);
    //!Add Q-bits to player
  }
  testDraw() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = "#0095DD";
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.restore();
    // translate to rectangle center
    this.game.ctx.save();
    this.game.ctx.fillStyle = "#0005DD";
    this.game.ctx.translate(this.x + 0.5 * this.width, this.y + 0.5 * this.height);
    this.game.ctx.rotate((Math.PI / 180) * this.game.view.frames);
    this.game.ctx.translate(-1 * (this.x + 0.5 * this.width), -1 * (this.y + 0.5 * this.height));
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.restore();
  }
}

class Projectile extends MobileEntity {
  constructor(game, x, y, width, height, speedX, speedY, damage, angle, attackerIdx) {
    super(game, x, y, width, height, speedX, speedY);
    this.damage = damage;
    this.angle = angle;
    this.aggressor = attackerIdx;
    this.speedX = -Math.cos(this.angle) * speedX;
    this.speedY = -Math.sin(this.angle) * speedY;
  }
  logic() {
    if (this.x > this.game.map.boundMaxX || this.x < this.game.map.tSize || this.y < this.game.map.tSize * 2 || this.y > this.game.map.boundMaxY) {
      this.disappear();
    }
    this.game.entities.forEach(entity => {
      const hitEntity = pointInRect(this.x, this.y, entity);
      if (hitEntity) {
        entity.hp -= this.damage;
        this.disappear();
      }
    });
  }
  update() {
    this.logic();
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw() {
    this.update();
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    this.game.ctx.fillStyle = "orange";
    this.game.ctx.fill();
  }
  disappear() {
    const idx = this.game.buildings[this.aggressor].projectiles.indexOf(this);
    this.game.buildings[this.aggressor].projectiles.splice(idx, 1);
  }
}
