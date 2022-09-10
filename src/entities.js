const chara = new Image();
chara.src = "/assets/images/blocky_dungeon.png";
//class Entity {
//  static COST = 5;
//  constructor(game, x, y, width, height, speedX, speedY, accX, accY, friction) {
//    this.game = game;
//    this.x = x;
//    this.y = y;
//    this.width = width; //|| 0;
//    this.height = height; //|| 0;
//    this.speedX = speedX; //|| 0;
//    this.speedY = speedY; //|| 0;
//    this.accX = accX || 0;
//    this.accY = accY || 0;
//    this.friction = friction || 0;
//    this.cost = 5;
//  }
//  //logic() {
//  //  this.x += 1;
//  //}
//  //moveLogic() {
//  //this.dx = this.game.mouse.x - this.x;
//  //this.dy = this.game.mouse.y - this.y;
//  //this.toMouseLength = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
//  //this.dx = this.dx / this.toMouseLength;
//  // this.dy = this.dy / this.toMouseLength;
//  // // Move to target point
//  // this.x += this.dx * this.speed;
//  // this.y += this.dy * this.speed;
//  //  this.angle = Math.atan2(this.game.mouse.y - this.y, this.game.mouse.x - this.x) * (180 / Math.PI);
//  // }
//  debug(posX, posY, width, height) {
//    this.game.ctx.save();
//
//    this.game.ctx.fillStyle = "#0095DD";
//    this.game.ctx.fillRect(posX, posY, width, height);
//    this.game.ctx.restore();
//
//    // translate to rectangle center
//    this.game.ctx.save();
//    this.game.ctx.fillStyle = "#03353D";
//    this.game.ctx.translate(posX + 0.5 * width, posY + 0.5 * height);
//    this.game.ctx.rotate((Math.PI / 180) * this.game.view.frames);
//    this.game.ctx.translate(-1 * (posX + 0.5 * width), -1 * (posY + 0.5 * height));
//    this.game.ctx.fillRect(posX, posY, width, height);
//    this.game.ctx.restore();
//    //if (this.i >= 90) this.i = 0;
//  }
//  //  draw() {
//  //    //console.log(this.game);
//  //    this.logic();
//  //    this.debug(this.x, this.y, this.width, this.height);
//  //    this.moveLogic();
//  //    //this.game.ctx.fillRect(50, 50, 50, 50);
//  //    // this.game.ctx.drawImage(chara, this.x, this.y, this.width, this.height);
//  //  }
//}
class MobileEntity {
  constructor(game, x, y, width, height, speedX, speedY, accX, accY) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX || 0;
    this.speedY = speedY || 0;
    this.accX = accX || 0;
    this.accY = accY || 0;
  }

  moveLogic() {}
}

class Bot extends MobileEntity {
  // TODO ==> class Bot extends MobileEntity.
  static COST = 5;
  static HP = 121;
  static DMG = 30;
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 1;
    this.speedX = 1;
    this.speedY = 1;
    this.rotation = 0; // || Math.atan2(this.game.mouse.y - this.y, this.game.mouse.x - this.x);
    this.angle = 0;
    this.cost = Bot.COST;
    this.hp = Bot.HP;
    this.coordPoints = [];
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
    //TODO check if coord is valid. Not an obstacle, perhaps there is another solution

    const randomRow = Math.floor(Math.random() * mapObj.mapW),
      randomCol = Math.floor(Math.random() * mapObj.mapH);
    //console.log([randomRow * mapObj.tSize, randomCol * mapObj.tSize]);
    //console.log(randomRow, randomCol);
    return [randomRow, randomCol];
  }

  coordsToWayPoint(mapCoordsArr) {
    //!!
    // this takes an arr [x,y] coords and returns waypoint in x & y
    const wayPoint = [mapCoordsArr[0] * this.game.map.tSize, mapCoordsArr[1] * this.game.map.tSize];
    // console.log(wayPoint);
    return wayPoint;
  }

  removeEntity() {
    // event triggers on 0 HP
    const idx = this.game.entities.indexOf(this);
    this.game.entities.splice(idx, 1);
  }

  moveLogic() {
    this.goTo(this.game.buildings[0]);
    this.checkObstacleCollision(); // test & debug
    if (this.game.mouse.isOnMap) {
      this.coordPoints.push(this.getRandomCoords(this.game.map));
      //this.goTo({ x: 0, y: 110 });
      this.chaseMouse();
    } else if (this.coordPoints.length > 0) {
      const waypoint = this.coordsToWayPoint(this.coordPoints);
      console.log(waypoint); //*❓❗Resolve NaN err..
      this.coordPoints.pop();
    }

    //TODO Run to random point if Prey is in a radius go mto prey coords
    //this.moveTo(this.getRandomCoords(this.game.map));
    //
    //  this.dx = this.game.mouse.x - this.x;
    //  this.dy = this.game.mouse.y - this.y;
    //  this.toMouseLength = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    //  this.dx = this.dx / this.toMouseLength;
    //  this.dy = this.dy / this.toMouseLength;
    //  // Move to target point
    //  // this.x += Math.cos(this.rotation) * this.speed;
    //  // this.y += Math.sin(this.rotation) * this.speed;
    //  this.x += this.dx * this.speed;
    //  this.y += this.dy * this.speed;
    //  //* IDEA: perhaps don't draw angle but set TOP DOWN LEFT RIGHT sprite direction based on getAngle */
    //  this.angle = getAngle(this.game.mouse, this);
    //this.angle = Math.atan2(this.game.mouse.y - this.y, this.game.mouse.x - this.x) * (180 / Math.PI);
    //followObj(this, this.game.mouse);
  }
  processLogic() {
    if (this.hp <= 0) {
      this.removeEntity();
    }
  }
  draw() {
    this.processLogic();
    this.moveLogic();
    this.x += this.speedX;
    this.y += this.speedY;
    this.game.ctx.font = "16px serif";
    this.game.ctx.fillText(`HP: ${this.hp}`, this.x, this.y);
    this.game.ctx.save();
    this.game.ctx.fillStyle = "yellow";
    this.game.ctx.translate(this.x + 0.5 * this.width, this.y + 0.5 * this.height);
    this.game.ctx.rotate((Math.PI / 180) * this.angle);
    this.game.ctx.translate(-1 * (this.x + 0.5 * this.width), -1 * (this.y + 0.5 * this.height));
    this.game.ctx.fillRect(this.x, this.y, this.width * 1, this.height * 1);
    this.game.ctx.restore();
  }
  //*# TRY & DEBUG Methods
  chaseMouse() {
    //* Distance to x and to y of mouse
    this.dx = this.game.mouse.x - this.x;
    this.dy = this.game.mouse.y - this.y;
    const length = Math.sqrt(this.dx ** 2 + this.dy ** 2);

    this.dx = this.dx / length;
    this.dy = this.dy / length;
    // Move to game.mouse x|y coords
    //this.x += Math.cos(this.rotation) * this.speed;
    //this.y += Math.sin(this.rotation) * this.speed;
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
    // Rotate to game.mouse x|y coords
    this.angle = getAngle(this.game.mouse, this);
    //followObj(this, this.game.mouse);
  }
  goTo(toObj) {
    this.dx = toObj.x - this.x;
    this.dy = toObj.y - this.y;
    // const toObjLength = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    const length = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    this.dy = this.dx / length;
    this.dx = this.dx / length;
    //this.y += Math.sin(this.rotation) * this.speed;
    this.x += this.dx * this.speedX;
    this.y += this.dy * this.speedY;
    this.angle = getAngle(toObj, this);
  }
}
