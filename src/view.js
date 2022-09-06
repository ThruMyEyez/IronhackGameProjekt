class View {
  constructor(game) {
    this.game = game;
    this.dragging = false;
    this.zoom = 1;
    this.offset = { x: innerWidth / 4, y: innerHeight / 4 };
    this.frames = 0;
    this.fps = 0;
  }
  resizeTranslate() {
    //resize canvas // responsive canvas
    this.game.canvas.width = window.innerWidth;
    this.game.canvas.height = window.innerHeight;
    // translate to canvas  center before zooming
    this.game.ctx.translate(this.game.mouse.x, this.game.mouse.y);
    //this.game.ctx.translate(innerWidth / 2, innerHeight / 2);
    this.game.ctx.scale(this.zoom, this.zoom);
    this.game.ctx.translate(-this.game.mouse.x + this.offset.x, -this.game.mouse.y + this.offset.y);
    //this.game.ctx.translate(-window.innerWidth / 2 + this.offset.x, -window.innerHeight / 2 + this.offset.y);
  }
  dragAround(ev) {
    if (this.dragging) {
      this.offset.x = this.game.mouse.getPosition(ev).x / this.zoom - this.game.mouse.x;
      this.offset.y = this.game.mouse.getPosition(ev).y / this.zoom - this.game.mouse.y;
    }
  }
  setZoom(ev) {
    console.log(ev);
    if (!this.dragging) {
      this.zoom += ev.deltaY * 0.0005;
      this.zoom = this.zoom.toFixed(2);
    }
    this.zoom = clamp(this.zoom, [0.6, 2]);
  }
  test(posX, posY, width, height) {
    this.game.ctx.save();
    this.game.ctx.fillStyle = "#0095DD";
    this.game.ctx.fillRect(posX, posY, width, height);
    this.game.ctx.restore();
    // translate to rectangle center
    this.game.ctx.save();
    this.game.ctx.fillStyle = "#0005DD";
    this.game.ctx.translate(posX + 0.5 * width, posY + 0.5 * height);
    this.game.ctx.rotate((Math.PI / 180) * this.frames);
    this.game.ctx.translate(-1 * (posX + 0.5 * width), -1 * (posY + 0.5 * height));
    this.game.ctx.fillRect(posX, posY, width, height);
    this.game.ctx.restore();
    //if (this.i >= 90) this.i = 0;
  }
  calcFPS(timestamp) {
    this.timeLastFrame = (timestamp - this.prevTime) / 1000;
    this.prevTime = timestamp;
    this.fps = Math.round(1 / this.timeLastFrame);
    //const time = Math.floor(this.prevTime / 1000);

    // console.log(this.timeLastFrame);
  }
  //tick(timestamp) {
  //  let start = 0;
  //  this.elapsed = timestamp - start;
  //  // tick each second;
  //  if (this.elapsed > 1000) {
  //    start = timestamp;
  //    //this.elapsed = 0;
  //    console.log(this.elapsed);
  //    this.game.time += 1;
  //    //this.game.player.update();
  //    //console.log(this.game.time);
  //  }
  //}
  tickTimer(val, actualFrames, ticksInSecond) {
    //this.game.time = this.frames % this.fps === 0 ? this.game.time + 1 : this.game.time;
    if (val % (actualFrames / ticksInSecond) === 0) {
      this.game.time = this.game.time + 1;
      this.game.player.addEnergy(1);
    }
  }
  draw(timestamp) {
    //!TODO 🚩 Refactor this 🤦 🚩
    this.frames++;
    this.tickTimer(this.frames, this.fps, 1);
    this.resizeTranslate();
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.save();
    this.game.map.drawMap();
    this.game.ctx.restore();
    this.calcFPS(timestamp);
    //this.tick(timestamp);
    for (const entity of this.game.entities) {
      entity.draw();
    }
    this.game.ui.draw();

    this.test(256, 256, 16, 16); //* For 2D debug

    // rAF loop
    const run = () => requestAnimationFrame(this.draw.bind(this));
    if (this.game.gameStopped) {
      cancelAnimationFrame(run);
    } else {
      run();
    }
  }
}
