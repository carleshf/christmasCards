const game = new Game(new Starring(), new Ending())

function preload() {
  titleFont = loadFont('assets/LastChristmas.otf');
  symbolsFont = loadFont('assets/WonderfulChristmasSymbols.otf');
}

function setup() {
  createCanvas(800, 800)
  frameRate(20)
}

function draw() {
  background(220)
  game.draw()
}

function keyPressed() {
  game.keyPressed(key)
  return false
}