var _cnt = 0
var gsz = 25
wsz = 10

const get_cnt = ( ) => {
  _cnt += 1
  return _cnt - 1
}

const update_state = ( x ) => {
  game.setState( x )
}

const force_draw = ( ) => {
  game.draw( objects )
}

class Level {
  constructor( layout, objects, viewpoint ) {
    this._id = 'm' + get_cnt()
    this._layout = layout
    /*this._objects = {
      _matrix: transform_to_matrix( objects, layout ),
      _list: objects
    }*/
    this._viewpoint = viewpoint
    this._cursor = 0
    let x = get_initial_player( layout[ 0 ]._lyt )
    if( x[ 0 ] ) {
      this._player_initial = [ x[ 1 ], x[ 2 ] ]
      this._player = new Player( x[ 1 ], x[ 2 ] )
    } else {
      console.error( '[ERROR] Could not find initial position for player in map 0' )
    }
  }
  
  draw( ox, oy, objects, sz = 20 ) {
    
    this._objects = {
      _matrix: transform_to_matrix( objects, layout ),
      _list: objects
    }
    
    let window = this._viewpoint.get_window( this._player, this._layout[ this._cursor ], this._objects._matrix[ this._cursor ] )
    window[ 0 ].draw( ox, oy, sz ) // map
    this._player.drawInventory( ox, oy, sz ) // inventory
    window[ 1 ].draw( ox, oy, sz ) // player
    
  }
  
  toString() {
    return `${this._id} (i: ${this._player[ 0 ]}, ${this._player[ 1 ]})`
  }
  
  _isCollision( key ) {
    var x = this._player._x
    var y = this._player._y
    
    if( key == 'ArrowUp' )    { x -= 1 }
    if( key == 'ArrowDown' )  { x += 1 }
    if( key == 'ArrowRight' ) { y += 1 }
    if( key == 'ArrowLeft' )  { y -= 1 }
    
    return {
      'layout': map_symbols( this._layout[ this._cursor ]._lyt[ x ][ y ] ),
      'objects': map_objects( x, y, this._objects._list[ this._cursor ]  )
    }
  }
  
  keyPressed( key ) { 
    var cell = this._isCollision( key )
    if( cell.objects[ 0 ] ) {
      cell.objects[ 1 ].action( this._player, this._layout[ this._cursor ] )
    } else {
      if( cell.layout.type != 'layout' ) {
        this._player.move( key ) 
      }
      if( cell.layout.type == 'link' ) {
        var link = get_pos_of_link( this._layout[ cell.layout.to ]._lyt, this._cursor )
        if( link[ 0 ] ) {
          this._cursor = cell.layout.to
          this._player._x = link[ 1 ]
          this._player._y = link[ 2 ]
        }
      }
    }
  }
  keyReleased( key ) { }
}


class Game {
  constructor(x, y) {
    this._x = x
    this._y = y
    this._scenario = [
      undefined, undefined, undefined
    ]
    this._state = 0
  }
  
  setState( n ) {
    this._state = n
  }
  
  setStarring( stg ) {
    this._scenario[ 0 ] = stg
  }
  
  setLevel( lvl ) {
    this._scenario[ 1 ] = lvl
  }
  
  setEnding( end ) {
    this._scenario[ 2 ] = end
  }
  
  draw( objects ) {
    if( this._state >= 0 & this._state <= 2 ) {
      background( 230 )
      if( this._state == 1 ) {
        this._scenario[ this._state ].draw( 175, 80, objects, gsz )
      } else {
        this._scenario[ this._state ].draw( 4, 0, gsz )
      }
    } else {
      console.error( '[ERROR] Game state is not 0, 1, or 2' )
    }
  }
  keyPressed( key ) { 
    if( this._state >= 0 & this._state <= 2 ) {
      background( 230 )
      this._scenario[ this._state ].keyPressed( key )
    } else {
      console.error( '[ERROR] Game state is not 0, 1, or 2' )
    }
  }
}

var game
var font



function preload() {
  //font = loadFont( 'assets/Caveat-Regular.ttf' )
  font = loadFont( 'assets/VT323-Regular.ttf' )
}

function setup() {
  createCanvas( 800, 600 )
  game = new Game()
  game.setStarring( new Starring() )
  game.setLevel(
    new Level( layout, objects, new ViewPoint( 18 ) )
  )
  game.setEnding( new Ending() )
  game.setState( 0 )
  
  game._scenario[ 1 ]._player.addInventory( 
    'obj1', 
    '[me]: I should check on Mr Santa', 1 
  )
  
  game.draw( objects )
}

function draw() { }

function keyPressed() {
  game.keyPressed( key )
  
  // only update when necessary
  //background( 230 )
  //curr.draw( 4, 0, gsz )
  game.draw( objects )
  
  return false
}

function keyReleased() {
  //game.keyReleased( key )
  return false
}