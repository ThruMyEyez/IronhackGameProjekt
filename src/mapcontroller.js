const mapAtlas = new Image();
mapAtlas.src = "/assets/images/blocky_dungeon.png";
const floorTypes = {
  void: 0,
  obstacle: 0,
  floor: 1,
  water: 2,
};
const tileObjects = [
  { id: "mapVoid", atlasCoords: [1, 1], nativeSize: 16, floor: floorTypes.void },
  { id: "mapFloor", atlasCoords: [6, 2], nativeSize: 16, floor: floorTypes.floor },
  { id: "Placeholder", atlasCoords: [1, 1], nativeSize: 16, floor: floorTypes.void },
  { id: "Placeholder", atlasCoords: [1, 1], nativeSize: 16, floor: floorTypes.void },
  { id: "mapBorderTopLeftSub", atlasCoords: [5, 1], nativeSize: 16, type: floorTypes.obstacle }, // begin border map tiles
  { id: "mapBorderTopLeft", atlasCoords: [5, 0], nativeSize: 16, type: floorTypes.obstacle }, //5
  { id: "mapBorderTop", atlasCoords: [6, 0], nativeSize: 16, type: floorTypes.obstacle },
  { id: "mapBorderTopSub", atlasCoords: [6, 1], nativeSize: 16, type: floorTypes.obstacle },
  { id: "mapBorderTopRight", atlasCoords: [7, 0], nativeSize: 16, type: floorTypes.obstacle },
  { id: "mapBorderTopRightSub", atlasCoords: [7, 1], nativeSize: 16, type: floorTypes.obstacle }, //9
  { id: "mapBorderLeft", atlasCoords: [5, 2], nativeSize: 16, type: floorTypes.obstacle }, //10
  { id: "mapBorderRight", atlasCoords: [7, 2], nativeSize: 16, type: floorTypes.obstacle }, //11
  { id: "mapBorderBottomLeft", atlasCoords: [5, 3], nativeSize: 16, type: floorTypes.obstacle }, //12
  { id: "mapBorderBottom", atlasCoords: [6, 3], nativeSize: 16, type: floorTypes.obstacle }, //13
  { id: "mapBorderBottomRight", atlasCoords: [7, 3], nativeSize: 16, type: floorTypes.obstacle }, //14 last border map tile
];

class Map {
  constructor(game, mapW, mapH, tileObj) {
    this.game = game;
    this.mapW = mapW;
    this.mapH = mapH;
    this.tSize = 16;
    this.tiles = mapGen(this.mapW, this.mapH).flat();
    this.tTypes = tileObj;
    this.x = 0;
    this.y = 0;
    this.width = this.tSize * this.mapW;
    this.height = this.tSize * this.mapH;
    this.addBorderToMap();
  }
  drawMap() {
    //const bgPattern = this.game.ctx.(,"repeat")
    this.game.ctx.save();
    this.game.ctx.fillStyle = "#2f283a";

    this.game.ctx.fillRect(-this.game.view.offset.x, -this.game.view.offset.y, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.restore();

    this.mapImages(mapAtlas, 1, 1, 16, this.game.canvas.width, this.game.canvas.height, 1);
    for (let i = 0; i < this.mapH; i++) {
      for (let j = 0; j < this.mapW; j++) {
        //switch (mapData[this.mapW * i + j]) {
        //  case 1:
        //    this.game.ctx.fillStyle = "#51a057";
        //    break;
        //  case 0:
        //    this.game.ctx.save();
        //    this.game.ctx.fillStyle = "#555";
        //    break;
        //  default:
        //    this.game.ctx.fillStyle = "#fff";
        //}
        //this.game.ctx.fillStyle = tileObjects[this.tiles[toIndex(x, y)]].colour;
        //if (this.tTypes[this.tiles[this.coords(j, i)]].type === 0) {
        //  const obstacle = { x:  };
        //  //  this.game.obstacles.push(obstacle);
        //}
        this.game.ctx.save();
        //this.game.ctx.fillStyle = this.tTypes[this.tiles[this.coords(j, i)]].colour; //image coords
        this.game.ctx.fillRect(j * this.tSize, i * this.tSize, this.tSize, this.tSize);
        this.game.ctx.restore();
        //! Get atlas images
        const cacheAtlasCoords = this.tTypes[this.tiles[this.coords(j, i)]].atlasCoords,
          cacheSpriteSize = this.tTypes[this.tiles[this.coords(j, i)]].nativeSize;
        this.mapImages(mapAtlas, cacheAtlasCoords[0], cacheAtlasCoords[1], cacheSpriteSize, j, i, 1);
        //this.game.ctx.drawImage(mapAtlas, 1 * this.tSize, 1 * this.tSize, this.tSize, this.tSize, 0 * this.tSize, 1 * this.tSize, this.tSize, this.tSize);
        //this.mapImages();
        //console.log(tileTypes[this.tiles[(1, 10)]]);
        //console.log(tileTypes);
      }
    }
  }
  addBorderToMap() {
    const borders = addBorderBounds(this.mapW, this.mapH, this.tSize);
    borders.forEach(el => {
      this.game.obstacles.push(el);
    });
  }
  coords(x, y) {
    return y * this.mapW + x;
  }
  mapImages(atlas, x, y, size, toCol, toRow, scale) {
    this.game.ctx.drawImage(atlas, x * size, y * size, size, size, toCol * size, toRow * size, size * scale, size * scale);
  }
}
