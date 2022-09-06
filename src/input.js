class Mouse {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
  }
  getPosition(ev) {
    return { x: ev.clientX, y: ev.clientY };
  }
  onMouseDown(ev) {
    this.game.view.dragging = true;
    //this.game.player.rmEnergy(5); // place this to player.spawn func
    this.game.deployEntity();
  }
  onMouseUp(ev) {
    this.game.view.dragging = false;
  }
  onMouseMove(ev) {
    this.isOnMap = false;
    this.game.view.dragAround(ev);
    this.x = this.getPosition(ev).x / this.game.view.zoom - this.game.view.offset.x;
    this.y = this.getPosition(ev).y / this.game.view.zoom - this.game.view.offset.y;
    // console.log("mouseX: " + this.x, "mouseY:" + this.y);
    // console.log("mouse on map: " + pointInRect(this.x, this.y, this.game.map));
    this.isOnMap = pointInRect(this.x, this.y, this.game.map) ? true : false;
    this.checkForObstacle();
  }

  input() {
    window.addEventListener("mousedown", event => this.onMouseDown(event));
    window.addEventListener("mouseup", event => this.onMouseUp(event));
    window.addEventListener("mousemove", event => this.onMouseMove(event));
    window.addEventListener("wheel", event => this.game.view.setZoom(event));
  }
  checkForObstacle() {
    //? for debug reasons
    this.onObstacle = false;
    for (const obstacle of this.game.obstacles) {
      const isMouseOnObstacle = pointInRect(this.x, this.y, obstacle);
      if (isMouseOnObstacle) {
        this.onObstacle = true;
        //console.log(this.onObstacle);
        console.log(`Mouse on obstacle with id: ${obstacle.id}`);
      }
    }
  }
}
