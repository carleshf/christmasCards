class GameObject {
  constructor( x, y, collectable = false, category = undefined ) {
    this._x = x
    this._y = y
    this._collect = collectable
    this._cat = category
    this._pos = { 'x': 0, 'y': 0 }
  }
  
  draw( fg, bc ) { }
}


class Key extends GameObject {
  constructor( color ) {
    super( 0, 0, true, 'keys' )
    this._sz = { 'w': 15, 'h': 25 }
    this._col = color
    switch( color ) {
      case 'red': // Crimson
        this._fill = "#DC143C"
        break
      case 'yellow': // Gold
        this._fill = "#FFD700"
        break
      case 'blue': // DodgerBlue
        this._fill = "#1E90FF"
        break
      case 'green': // LimeGreen
        this._fill = "#32CD32"  
        break
      case 'purple': // LimeGreen
        this._fill = "#9400D3"
        break
      case 'white':
        this._fill = "#FFFFFF"
        break
      case 'black':
        this._fill = "#000000"
        break
    }
  }
  
  setPosition(x, y, cx, cy) {
    this._x = x
    this._y = y
    this._pos.x = cx
    this._pos.y = cy
  }
  
  draw( fg, bc ) {
    rectMode( CORNER )
    ellipseMode( RADIUS )
    var x = this._x + cellsize / 2
    var y = this._y + cellsize / 3
    
    noStroke()
    fill( this._fill )
    ellipse( x, y, this._sz.w / 2 , this._sz.w / 2 )

    let wr = this._sz.w / 2
    let hr = this._sz.h / 5 * 4
    rect( x - wr / 2, y, wr, hr )
    
    rect( x + 1, y + hr - 10, 4, 3)
    rect( x + 1, y + hr - 5, 5, 5)
  }
}


class Present extends GameObject {
  constructor( size, color ) {
    super( 0, 0, true, 'presents' )
    this._sz = { 'w': 0, 'h': 0 }
    switch( size ) {
      case 's':
        this._sz = { 'w': 15, 'h': 15 }
        break
      case 'l':
        this._sz = { 'w': 25, 'h': 15 }
        break
      default:
        console.error( 'Invalid size "' + type + '" for GameObject extension Presnt' )
        break
    }
    switch( color ) {
      case 'violet':
        this._fill = '#C71585'  // MediumVioletRed
        this._badge = '#DDA0DD' // Plum
        break
      case 'crimson':
        this._fill = '#DC143C'  // Crimson
        this._badge = '#E6E6FA' // Lavender
        break
      case 'tomato':
        this._fill = '#FF6347'  // Tomato
        this._badge = '#800000' // Maroon
        break
      case 'gold':
        this._fill = '#FFD700'  // Gold
        this._badge = '#000000' // Black
        break
      case 'royalblue':
        this._fill = '#4169E1'  // RoyalBlue
        this._badge = '#FFFAFA' // Teal
        break
      case 'skyblue':
        this._fill = '#00BFFF'  // DeepSkyBlue
        this._badge = '#F0FFF0' // Honeydew
        break
      case 'teal':
        this._fill = '#008080'  // Teal
        this._badge = '#FFFAFA' // Snow
        break
      case 'forestgreen':
        this._fill = '#228B22'  // ForestGreen
        this._badge = '#F0FFF0' // Honeydew
        break
      default:
        console.error( 'Invalid color "' + color + '" for GameObject extension Present' )
        break
    }
  }
        
  setPosition(x, y, cx, cy) {
    this._x = x
    this._y = y
    this._pos.x = cx
    this._pos.y = cy
  }
  
  draw( fg, bc ) {
    rectMode( CORNER )
    var x = this._x + ( cellsize - this._sz.w ) / 2
    var y = this._y + ( cellsize - this._sz.h ) / 2
    
    noStroke()
    fill( this._badge )
    rect( x, y, this._sz.w, this._sz.h )
    fill( this._fill )
    rect( x, y, this._sz.w / 3, this._sz.h / 3 )
    rect( x + this._sz.w * 2 / 3, y, this._sz.w / 3, this._sz.h / 3 )
    rect( x, y + this._sz.h * 2 / 3, this._sz.w / 3, this._sz.h / 3 )
    rect( x + this._sz.w * 2 / 3, y + this._sz.h * 2 / 3, this._sz.w / 3, this._sz.h / 3 )
  }
}


class Wall extends GameObject {
  constructor() { 
    super( 0, 0, false, 'walls' )
  }
  
  setPosition(x, y, cx, cy) {
    this._x = x
    this._y = y
    this._pos.x = cx
    this._pos.y = cy
  }
  
  draw( fc, bc ) {
    rectMode( CORNER )
    stroke( fc )
    fill( fc )
    rect( this._x, this._y, cellsize, cellsize )
  }
  
}


class Door extends GameObject {
  constructor( location, destination ) {
    super( 0, 0, false, 'doors' )
    this._loc = location
    this._link = destination
  }
  
  setPosition(x, y, cx, cy) {
    this._x = x
    this._y = y
    this._pos.x = cx
    this._pos.y = cy
  }
  
  openDoor( player ) {
    return true
  }
  
  draw( fc, bc ) {
    rectMode( CORNER )

    // reset wall
    fill( bc )
    stroke( fc )
    rect( this._x, this._y, cellsize, cellsize )
    
    // draw door
    stroke( fc )
    fill( fc )
    if( this._loc == 'left' | this._loc == 'l' ) rect( this._x + cellsize / 2, this._y, - cellsize / 4, cellsize )
    if( this._loc == 'right' | this._loc == 'r' ) rect( this._x + cellsize / 2, this._y, cellsize / 4, cellsize )
    if( this._loc == 'top' | this._loc == 't' ) rect( this._x, this._y + cellsize / 4, cellsize, cellsize / 4 )
    if( this._loc == 'bottom' | this._loc == 'b' ) rect( this._x, this._y + cellsize / 4 * 3, cellsize, - cellsize / 4 )
  } 
}
    
    
    
    
class KeyDoor extends GameObject {
  constructor( location, destination, key_color = 'white' ) {
    super( 0, 0, false, 'doors' )
    this._loc = location
    this._link = destination
    this._open = false
    if( key_color == 'r' )  this._key = 'red'
    if( key_color == 'y' )  this._key = 'yellow'
    if( key_color == 'b' )  this._key = 'blue'
    if( key_color == 'g' )  this._key = 'green'
    if( key_color == 'p' )  this._key = 'purple'
    if( key_color == 'w' )  this._key = 'white'
    if( key_color == 'k' )  this._key = 'black'
  }
  
  setPosition(x, y, cx, cy) {
    this._x = x
    this._y = y
    this._pos.x = cx
    this._pos.y = cy
  }
  
  openDoor( player ) {
    if( this._open ) {
      return true
    } else {
      if( player.useKey( this._key ) ) {
        this._open = true
        return true
      } else {
        return false
      }
    }
  }
  
  draw( fc, bc ) {
    rectMode( CORNER )

    // reset wall
    fill( bc )
    stroke( fc )
    rect( this._x, this._y, cellsize, cellsize )
    
    if( this._open ) {
      // draw door
      stroke( fc )
      fill( fc )
      if( this._loc == 'left' | this._loc == 'l' ) rect( this._x + cellsize / 2, this._y, - cellsize / 4, cellsize )
      if( this._loc == 'right' | this._loc == 'r' ) rect( this._x + cellsize / 2, this._y, cellsize / 4, cellsize )
      if( this._loc == 'top' | this._loc == 't' ) rect( this._x, this._y + cellsize / 4, cellsize, cellsize / 4 )
      if( this._loc == 'bottom' | this._loc == 'b' ) rect( this._x, this._y + cellsize / 4 * 3, cellsize, - cellsize / 4 )
    } else {
    // draw door
      stroke( fc )
      fill( fc )
      if( this._loc == 'left' | this._loc == 'l' ) rect( this._x + cellsize / 4, this._y, cellsize / 2, cellsize )
      if( this._loc == 'right' | this._loc == 'r' ) rect( this._x + cellsize / 4, this._y, cellsize / 2, cellsize )
      if( this._loc == 'top' | this._loc == 't' ) rect( this._x, this._y + cellsize / 4, cellsize, cellsize / 2 )
      if( this._loc == 'bottom' | this._loc == 'b' ) rect( this._x, this._y + cellsize / 4 * 3, cellsize, - cellsize / 2 )

      // draw keyhole
      noStroke()
      if( this._key == 'red' )    fill( "#DC143C" )
      if( this._key == 'yellow' ) fill( "#FFD700" )
      if( this._key == 'blue' )   fill( "#1E90FF" )
      if( this._key == 'green' )  fill( "#32CD32" )
      if( this._key == 'purple' ) fill( "#9400D3" )
      if( this._key == 'white' )  fill( "#FFFFFF" )
      if( this._key == 'black' )  fill( "#000000" )
      circle( this._x + cellsize / 2, this._y + cellsize / 4 + 7, 4 )
      beginShape()
      vertex( this._x + cellsize / 2, this._y + cellsize / 4 + 6 )
      vertex( this._x + cellsize / 2 - 4, this._y + cellsize / 4 + 17 )
      vertex( this._x + cellsize / 2 + 4, this._y + cellsize / 4 + 17 )
      endShape(CLOSE)
    }
  } 
}