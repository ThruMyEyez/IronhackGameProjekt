const clamp = (value, [min, max]) => Math.max(Math.min(value, max), min);
// Collision Functions
const pointInRect = (x, y, rect) => x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height;
const isPointInCircle = (x, y, arcObj) => {
  const dx = x - arcObj.cx;
  const dy = y - arcObj.cy;
  return dx * dx + dy * dy < arcObj.radius * arcObj.radius;
};
const circlesColliding = (arc1, arc2) => {
  const dx = arc2.x - arc1.x;
  const dy = arc2.y - arc1.y;
  const rSum = arc1.radius + arc2.radius;
  return dx * dx + dy * dy <= rSum * rSum;
};
const rectInRect = (rect1, rect2) =>
  !(rect1.x > rect2.x + rect2.width || rect1.x + rect1.width < rect2.x || rect1.y > rect2.y + rect2.height || rect1.y + rect1.height < rect2.y);
//* IDEA: perhaps don't draw angle but set TOP DOWN LEFT RIGHT sprite direction based on getAngle */
const getAngle = (obj1, obj2) => Math.atan2(obj1.y - obj2.y, obj1.y - obj2.x) * (180 / Math.PI);

//? take lerp function for UI & (perhaps i need a pathfinder algo) in consideration ?
// TODO: global functions, like moveTo, getAngleTo, randomFromArray.
//* construction section for TODO functions ==>
const followObj = (thisObj, toFollowObj) => {
  thisObj.dx = toFollowObj.x - thisObj.x;
  thisObj.dy = toFollowObj.y - thisObj.y;
  const toTargetLength = Math.sqrt(thisObj.dx ** 2 + thisObj.dy ** 2);
  thisObj.dx = thisObj.dx / toTargetLength;
  thisObj.dx = thisObj.dx / toTargetLength;
  thisObj.x += thisObj.dx * thisObj.speed;
  thisObj.y += thisObj.dy * thisObj.speed;
  thisObj.angle = getAngle(thisObj, toFollowObj);
};

//! that idea could be a shot in my own leg...
class Utils {
  constructor(game) {
    this.game = game;
    this.helper();
  }
  helper() {}
}
