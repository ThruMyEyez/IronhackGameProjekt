const clamp = (value, [min, max]) => Math.max(Math.min(value, max), min);
// Collision Functions
const pointInRect = (x, y, rect) => x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height;
const isPointInCircle = (x, y, arcObj) => {
  const dx = x - arcObj.cx;
  const dy = y - arcObj.cy;
  return dx * dx + dy * dy < arcObj.radius * arcObj.radius;
};

const rectInRect = (rect1, rect2) =>
  !(rect1.x > rect2.x + rect2.width || rect1.x + rect1.width < rect2.x || rect1.y > rect2.y + rect2.height || rect1.y + rect1.height < rect2.y);
//* IDEA: perhaps don't draw angle but set TOP DOWN LEFT RIGHT sprite direction based on getAngle */
const getAngle = (obj1, obj2) => Math.atan2(obj1.y - obj2.y, obj1.x - obj2.x) * (180 / Math.PI);
const getAngleRad = (obj1, obj2) => Math.atan2(obj1.cy - obj2.y, obj1.cx - obj2.x);

const distance = (a, b) => Math.hypot(...Object.keys(a).map(el => b[el] - a[el])).toFixed(2);
console.log(distance([0, 0], [1, 1]));

const playLaserAudio = () => {
  const audio = new Audio("/assets/sound/towerBullet.wav");
  audio.play();
};
const playWinAudio = () => {
  const audio = new Audio("/assets/sound/fanfare.wav");
  audio.play();
};
const playLooseAudio = () => {
  const audio = new Audio("/assets/sound/gameOver.wav");
  audio.play();
};
const botDestroyedAudio = () => {
  const audio = new Audio("/assets/sound/gameOver.wav");
  audio.play();
};
const popAudio = () => {
  const audio = new Audio("/assets/sound/ballPop.wav");
  audio.play();
};
// TODO:  randomFromArray func
//* construction section for TODO functions ==>
//const followObj = (thisObj, toFollowObj) => {
//  thisObj.dx = toFollowObj.x - thisObj.x;
//  thisObj.dy = toFollowObj.y - thisObj.y;
//  const toTargetLength = Math.sqrt(thisObj.dx ** 2 + thisObj.dy ** 2);
//  thisObj.dx = thisObj.dx / toTargetLength;
//  thisObj.dx = thisObj.dx / toTargetLength;
//  thisObj.x += thisObj.dx * thisObj.speed;
//  thisObj.y += thisObj.dy * thisObj.speed;
//  thisObj.angle = getAngle(thisObj, toFollowObj);
//};
//
//! that idea could be a shot in my own leg...

/*  
class Utils { // 🚩 DON'T DO IT 
  constructor(game) {
    this.game = game;
    this.helper();
  }
  helper() {}
} */
