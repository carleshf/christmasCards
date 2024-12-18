const sz   = 20
const szi  = 21
const szF  = 40
const szFi = 60


const figs = ["F", "G", "B", "S", "Q", "M", 
              "d", "n", "q", "w", "y", "4", 
              "5", "8", "&", "_", "v"]
const random = () => { 
  return Math.floor(Math.random() * figs.length) 
}

const get_player = (layout) => {
  var x = -1
  var y = -1
  for(var ii = 0; ii < layout[0].length; ii++) {
    for(var jj = 0; jj < layout.length; jj++) {
      if(layout[jj][ii] == "i") {
        x = ii
        y = jj
      }
    }
  }
  return {"x": x, "y": y}
}

class Starring {
  constructor() {
  }
  draw() {
    //background("#FFFFFF")
    textFont('Verdana');
    textAlign(CENTER)
    
    textSize(29)
    text("Mr. Santa is late!", 400, 100)
    text("🎅", 400, 150)
    textSize(23)
    text("Can you help him get the presents, some\nchococaltes, and find the sleigh?", 400, 300)
    textSize(13)
    text("(Press any key to start)", 400, 450)
    
    
    textAlign(LEFT)
  }
}

class Ending {
  constructor() {
  }
  draw() {
    textSize(42)
    textFont(titleFont)
    text("Joyful Yuletide!", 150, 200)
    text("Happy Winter Break!", 250, 260)
    text("~Carles", 175, 350)
    
    textSize(21)
    text("with love, from barcelona", 300, 780)
    
    textSize(39)
    textFont(symbolsFont)
    text("=", 600, 140)
    text("F", 100, 400)
  }
}

class Game {
  
  constructor(starring, ending) {
    this._newGame(0)
    this._starring = starring
    this._ending = ending
    this._status = "starring"
  }
  
  _newGame(iid) {
    this._mapi = iid
    this._map = new Map(maps[this._mapi])
    this._player = new Player(get_player(this._map._layout))
    this._offset = maps[this._mapi].offset
  }
  
  _drawDecorations(title, symbols) {
    textSize(szF)
    textFont(titleFont)
    text(title, 55, 50)
    
    textSize(szF)
    textFont(symbolsFont)
    for(var ii = 0; ii < symbols[0].length; ii++) {
      text(symbols[0][ii],  10, 105 + ii * szFi)
    }
    for(ii = 0; ii < symbols[0].length; ii++) {
      text(symbols[1][ii], 750, 105 + ii * szFi)
    }
    
    /*textSize(sz)
    textFont('Courier New')
    text("fire: " + this._player._items.fire, 80, 650)
    text("ice: " + this._player._items.ice, 80, 670)
    text("presents: " + this._player._items.presents, 80, 690)
    text("chocolates: " + this._player._items.chocolates, 80, 710)
    text("cookies: " + this._player._items.cookies, 80, 730)*/
  }
  
  draw() {
    if(this._status == "starring") {
      this._starring.draw()
    } else if(this._status == "ending") {
      this._ending.draw()
    } else {
      this._checkMapCollisions()
      this._drawDecorations(this._map._title, this._map._symbols)
      this._map.draw(this._offset[0], this._offset[1])
      this._player.draw(this._offset[0], this._offset[1])
      this._checkCollectableCollisions()
    }
  }
  
  _checkCollectableCollisions() {
    var x = this._player._i
    var y = this._player._j
    var c = this._map.isCollectabke(x, y)
    if(c.flag && c.type == "endGame") {
      if(this._mapi + 1 < maps.length) {
        this._newGame(this._mapi + 1)
      } else {
        this._status = "ending"
      }
    } else if(c.flag && c.type == "collectable") {
      this._player.addCollectable(c.value)
    } else if(c.flag && c.type == "direction") {
      this._player.update(c.value)
    }
  }
  
  _checkMapCollisions() {
    var x = this._player._i
    var y = this._player._j
    switch(this._player._status) {
      case "up":
        y = this._player._j - this._player._step
        break
      case "down":
        y = this._player._j + this._player._step
        break
      case "right":
        x = this._player._i + this._player._step
        break
      case "left":
        x = this._player._i - this._player._step
        break
    }
    var block = this._map.isBlock(x, y)
    if(block.flag) {
      if(block.value == "Y" && this._player._items.fire > 0) {
        this._player._items.fire -= 1
        this._map._layout[y][x] = " "
      } else if(block.value == "W" && this._player._items.ice > 0) {
        this._player._items.ice -= 1
        this._map._layout[y][x] = " "
      } else {
        this._player.update("stop")
      }
    }
  }
  
  keyPressed(key) {
    if(this._status == "starring") {
      this._status = "game"
    } else if(this._status == "ending") {
      if(key == "r" || key == "R") {
        this._status = "starring"
        this._mapi = 0
        this._newGame(this._mapi)
      }
    } else {
      if(key == "r" || key == "R") {
        this._newGame(this._mapi)
      } else if(!this._player.isMoving()) {
        const downK  = ["ArrowDown",  "s", "S"]
        const upK    = ["ArrowUp",    "w", "W"]
        const rightK = ["ArrowRight", "d", "D"]
        const leftK  = ["ArrowLeft",  "a", "A"]

        if(downK.includes(key)) {
          this._player.update("down")
        } else if(upK.includes(key)) {
          this._player.update("up")
        } else if(rightK.includes(key)) {
          this._player.update("right")
        } else if(leftK.includes(key)) {
          this._player.update("left")
        }
      }
    }
  }
}

class Player {
  
  constructor(pos) {
    this._i = pos.x
    this._j = pos.y
    this._step = 1
    this._status = "stop"
    this._chocolate = 0
    this._presents = 0
    this._candies = 0
    this._items = { "presents": 0, "chocolates": 0, "fire": 0, "ice": 0, "default": 0, "cookies": 0 }
  }
  
  draw(ox, oy) {
    this._updatePosition()
    textSize(sz)
    textFont('Courier New')
    text(mappings.i, ox + this._i * szi, oy + this._j * szi)
  }
  
  update(direction) {
    this._status = direction
  }
  
  addCollectable(type) {
    var x = 'default'
    switch(type){
      case "r":
      x = "fire"
        break
      case "p":
        x = "presents"
        break
      case "c":
        x = "chocolates"
        break
      case "w":
        x = "ice"
        break
      case "o":
        x = "cookies"
        break
    }
    this._items[x] += 1
  }
  
  _updatePosition() {
    switch(this._status) {
      case "up":
        this._j -= this._step
        break
      case "down":
        this._j += this._step
        break
      case "right":
        this._i += this._step
        break
      case "left":
        this._i -= this._step
        break
      default:
        break
    }
  }
    
  isMoving() {
    return this._status != "stop"
  }
}
const copyLayout = (layout) => {
  var x = []
  for(ii = 0; ii < layout.length; ii++) {
    var y = []
    for(jj = 0; jj < layout[0].length; jj++) {
      y.push(layout[ii][jj])
    }
    x.push(y)
  }
  return x
}

class Map {
  
  
  constructor(map) {
    this._title = map.title
    this._layout = copyLayout(map.layout)
    this._symbols = [ [], [] ]
    
    for(var ii = 0; ii < 11; ii++) {
      this._symbols[0].push(figs[random()])
      this._symbols[1].push(figs[random()])
    }
  }
  
  draw(ox, oy) {
    const w = this._layout[0].length
    const h = this._layout.length
    
    textSize(sz)
    textFont('Courier New')
    for(var ii = 0; ii < w; ii++) {
      for(var jj = 0; jj < h; jj++) {
        if(this._layout[jj][ii] != " " && this._layout[jj][ii] != "i") {
          text(mappings[this._layout[jj][ii]], ox + szi * ii, oy + szi * jj)
        }
      }
    }
  }
  
  isBlock(x, y) {
    if(x >= this._layout[0].length || x < 1) {
      return { "flag": true }
    }
    if(y >= this._layout.length || y < 1) {
      return { "flag": true }
    }
    if(blocksSymbols.includes(this._layout[y][x])) {
      return { "flag": true, "type": "block", "value": this._layout[y][x] }
    }
    return { "flag": false }
  }
  
  isCollectabke(x, y) {
    if(endsSymbols.includes(this._layout[y][x])) {
       return { "flag": true, "type": "endGame" }
    } else if(collectablesSymbols.includes(this._layout[y][x])) {
      var v = this._layout[y][x]
      this._layout[y][x] = " "
      return { "flag": true, "type": "collectable", "value": v }
    } else if(directSymbols.includes(this._layout[y][x])) {
      var d = "stop"
      if(this._layout[y][x] == "R") { d = "right" }
      if(this._layout[y][x] == "L") { d = "left" }
      if(this._layout[y][x] == "U") { d = "up" }
      if(this._layout[y][x] == "D") { d = "down" }
      return { "flag": true, "type": "direction", "value": d }
    } else {   
      return { "flag": false }
    }
  }
} 