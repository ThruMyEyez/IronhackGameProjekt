const gameOverScreenElement = document.getElementById("game-over-screen"),
  gameWinScreenElement = document.getElementById("game-win-screen"),
  bugsAmount = 75,
  mapW = clamp(80, [50, 256]),
  mapH = clamp(90, [50, 256]);
const game = new Game(gameOverScreenElement, gameWinScreenElement, bugsAmount, mapW, mapH);
