// Map generation logic ==>
//TODO Refactor
const mapGen = (mapW, mapH) => {
  //BorderGen
  const mapArr = [],
    topBorder = [5],
    topSubBorder = [4],
    bottomBorder = [12];
  for (let i = 0; mapW - 2 > i; i++) {
    topBorder.push(6);
  }
  topBorder.push(8);
  mapArr.push(topBorder);
  for (let i = 0; mapW - 2 > i; i++) {
    topSubBorder.push(7);
  }
  topSubBorder.push(9);
  mapArr.push(topSubBorder);
  for (let i = 0; mapW - 2 > i; i++) {
    bottomBorder.push(13);
  }
  bottomBorder.push(14);
  //Generate Playfield =>
  for (let i = 0; mapH - 3 > i; i++) {
    const playableRow = [10];
    for (let j = 0; mapW - 2 > j; j++) {
      playableRow.push(1);
    }
    playableRow.push(11);
    mapArr.push(playableRow);
  }

  mapArr.push(bottomBorder);
  return mapArr;
};

function addBorderBounds(mapW, mapH, tSize) {
  const borderTopBoundary = { x: 0, y: 0, width: mapW * tSize, height: 2 * tSize, id: "top" };
  const borderLeftBoundary = { x: 0, y: tSize * 2, width: tSize, height: (mapH - 3) * tSize, id: "left" };
  const borderRightBoundary = { x: (mapW - 1) * tSize, y: 0, width: tSize, height: (mapH - 3) * tSize, id: "right" };
  const borderBottomBoundary = { x: 0, y: (mapH - 1) * tSize, width: mapW * tSize, height: tSize, id: "bottom" };
  return [borderTopBoundary, borderLeftBoundary, borderRightBoundary, borderBottomBoundary];
}
//console.log(addBorderBounds(60, 70, 16));
