cellsize = 40

// --------
// USED IN HUD CLASS TO COLOR THE KEY ACCORDING TO THE ONE OBTAINED
const _color_key = ( color ) => {
  if( color == 'red' )    return "#DC143C"
  if( color == 'yellow')  return "#FFD700"
  if( color == 'blue' )   return "#1E90FF"
  if( color == 'green' )  return "#32CD32"  
  if( color == 'purple' ) return "#9400D3"
  if( color == 'white' )  return "#FFFFFF"
  if( color == 'black' )  return "#000000"
}

const _tr_present_col = ( color ) => {
  if( color == 'v' ) return 'violet'
  if( color == 'c' ) return 'crimson'
  if( color == 't' ) return 'tomato'
  if( color == 'y' ) return 'gold'
  if( color == 'b' ) return 'royalblue'
  if( color == 's' ) return 'skyblue'
  if( color == 'a' ) return 'teal'
  if( color == 'g' ) return 'forestgreen'
}

const _tr_key_col = ( color ) => {
  if( color == 'r' ) return 'red'
  if( color == 'b' ) return 'blue'
  if( color == 'g' ) return 'green'
  if( color == 'y' ) return 'yellow'
  if( color == 'p' ) return 'purple'
  if( color == 'k' ) return 'black'
  if( color == 'w' ) return 'white'
}

// --------
// USED TO CREATE A GAME FROM A JAVASCRIPT TEXT
function map_from_str( rooms ) {
  var rst = new Map()
  rooms.content.forEach( (room) => {
    var nroom = new Room( room.w, room.h, room.cf, room.cb, room.walls.split(''), room.text.flag, room.text.msg )
    var r = -1
    var c = 0
    for( var ii = 0; ii < room.desc.length; ii++ ) {
      var obj = room.desc[ ii ]
      var obj_dsc = obj.typ.split('')
      switch( obj_dsc[ 0 ] ) {
        case 'p':
          nroom.addObject( new Present( 's', _tr_present_col( obj_dsc[ 1 ] ) ), obj.x, obj.y )
          break
        case 'k':
          nroom.addObject( new Key( _tr_key_col( obj_dsc[ 1 ] ) ), obj.x, obj.y )
          break
        case 'd':
          nroom.addObject( new Door( obj_dsc[ 1 ], obj_dsc[ 2 ] ), obj.x, obj.y )
          break
        case 'l':
          nroom.addObject( new KeyDoor( obj_dsc[ 1 ], obj_dsc[ 2 ], obj_dsc[ 3 ] ), obj.x, obj.y )
          break
      }
    }
    rst.addRoom( room.name, nroom )
  })
  rst.addPlayer( new PC() )
  rst.setCurrent( rooms.start )
  return rst
}


// --------
// HUD CLASS TO VISUALIZE INFORMATION FOR USER                        
class Hud {
  constructor() {
    this._player = undefined
    this._location = 1
  }
  
  setPlayer( cb ) {
    this._player = cb
  }
  
  setLocation( loc ) {
    if(loc > 0 && loc < 5) {
      this._location = loc
    }
  }
  
  draw() {
    // clear
    noStroke()
    fill( bkg )
    rect( 0, 0, width, 33 )
    // draw
    let cnt = this._player.getInventary()
    textAlign( LEFT, CENTER )
    textSize( 13 )
    textFont( bit_font )
    let clr = "#006699"
    fill(clr)
    noStroke()
    text( 'presents: ' + cnt[ 'presents' ] + ' (' + cnt[ 'accum' ] + ')', 5, 16 )
    text ('keys:', 135, 16 )
    var wc = 50
    for ( const col in cnt[ 'keys' ] ) {
      if( cnt[ 'keys' ][ col ] ) {
        noStroke()
        fill( _color_key( col ) )
      } else {
        stroke( clr )
        fill( bkg )
      }
      circle( 135 + wc, 16, 10 )
      wc += 13
    }
  }
}


// --------
// MAP CLASS - IMPLEMENTATION OF THE GAME IS HERE
class Map {
  constructor() {
    this._rooms = {}
    this._current = undefined
    this._player = undefined
    this._hud = undefined
    this._clear = false
    this._msg_act = false
  }
  
  addRoom( label, room ) {
    if ( !( label in this._rooms ) ) {
      this._rooms[ label ] = room
    }
  }
  
  setCurrent( label ) {
    if( label in this._rooms ) {
      this._current = label
      this._clear = true
      
      if (typeof this._player !== 'undefined') {
        this._player.x = this._rooms[ this._current ]._start.x
        this._player.y = this._rooms[ this._current ]._start.y
      } else {
        console.error('Set player position with no player assigned.')
      }
    }
  }
  
  addPlayer( plyr ) {
    this._player = plyr
    this._hud = new Hud()
    this._hud.setPlayer( this._player )
  }
  
  addNpc( room_name, npc ) {
    this._rooms[ room_name ].addObject( npc, npc._loc.x, npc._loc.y )
  }
  
  movePlayer( key ) {
    var w = this._rooms[ this._current ]._w
    var h = this._rooms[ this._current ]._h
    var f = false
    if( key == 39 || key == 68 ) { // left
      if( this._player.x <  w - 1 && !this._msg_act ) { 
        this._player.x++
        f = true
      }
    } else if( key == 38 || key == 87 ) { // up
      if( this._player.y > 0 && !this._msg_act ) {
        this._player.y--
        f = true
      }
    } else if( key == 37 || key == 65 ) { // right
      if( this._player.x > 0 && !this._msg_act ) {
        this._player.x--
        f = true
      }
    } else if( key == 40 || key == 83 ) { // down
      if( this._player.y < h - 1 && !this._msg_act ) {
        this._player.y++
        f = true
      }
    } else if( key == 13 || key == 32 ) {
      if( global_flag == 'end' ) {
        global_stage = 'ending'
      }
    } else {
      console.error('Invalid character with keyCode "' + key.toString() + '"')
    }

    var obj = this._rooms[ this._current ].getObject( this._player.x, this._player.y )
    if( obj[ 0 ] ) {
      if( obj[ 2 ]._collect ) { // if collectable, it is collected and deleted
        this._player.addObject( obj[ 2 ] )
        this._rooms[ this._current ].removeObject( obj[ 1 ] )
      } else { // if not collectable we undo the movment
        if( f && ( key == 39 || key == 68 ) ) { // undoo left
            this._player.x--
        } else if( f && ( key == 38 || key == 87 ) ) { // undoo up
            this._player.y++
        } else if( f && ( key == 37 || key == 65 ) ) { // undoo right
            this._player.x++
        } else if( f && ( key == 40 || key == 83 ) ) { // undoo down
            this._player.y--
        }
      }
    }
    
    // interact with door ?
    if( obj[ 0 ] && obj[ 2 ]._cat == 'doors' && obj[ 2 ].openDoor( this._player ) ) {
      var x = this._rooms[ obj[ 2 ]._link ].getDoorTo( this._current )
      if( x[ 0 ] ) {
        this.setCurrent( obj[ 2 ]._link )
        this._player.x = x[ 1 ]
        this._player.y = x[ 2 ]
        this._rooms[ obj[ 2 ]._link ].setStartPosition( x[ 1 ], x[ 2 ] )
      }
    }
    // interact with NPC ?
    if( obj[ 0 ] && obj[ 2 ]._cat == 'npc' ) {
      obj[ 2 ].interact( this._player, false )
    }
  }


  getPlayerPosition( coordinates = false ) {
      var rst = { 'x': this._player.x, 'y': this._player.y }
      if( coordinates ) {
        return rst
      } else {
        var room = this._rooms[ this._current ]
        rst.x *= room._sz
        rst.y *= room._sz
        rst.x += room._ow + room._sz / 2
        rst.y += room._oh + room._sz / 2
      }
      return rst
  }
  
  draw() { 
    if( this._clear ) {
      background( bkg )
      this._clear = false
    }
    
    if( typeof this._current !== 'undefined' ) {
      this._rooms[ this._current ].draw()
    }
    
    if( typeof this._player !== 'undefined' ) {
      this._player.draw( this.getPlayerPosition() ) 
    }
    
    if( typeof this._hud !== 'undefined' ) {
      this._hud.draw() 
    }
  }
}








class Room {
  constructor( w, h, cf, cb, walls = '', has_text = 0, text = '' ) {
    this._w = w
    this._h = h
    this._sz = cellsize
    
    this._ow = width  / 2 - this._sz * this._w / 2
    this._oh = height / 2 - this._sz * this._h / 2
    
    this._elms = [ ]
    
    for( var ii = 0; ii < walls.length; ii++ ) {
      if( walls[ ii ] == 't' ) {
          for( var jj = 0; jj < this._w; jj++ ) {
            this.addObject( new Wall( ), jj, 0 )
          }
      } else if( walls[ ii ] == 'b' ) {
          for( var jj = 0; jj < this._w; jj++ ) {
            this.addObject( new Wall( ), jj, this._h - 1 )
          }
      } else if( walls[ ii ] ==  'l' ) {
          for( var jj = 0; jj < this._h; jj++ ) {
            this.addObject( new Wall( ), 0, jj )
          }
      } else if( walls[ ii ] ==  'r' ) {
          for( var jj = 0; jj < this._h; jj++ ) {
            this.addObject( new Wall( ), this._w - 1, jj )
          }
      }
    }
    
    this._color = { 'foreground': cf, 'background': cb }
    this._start = { 'x': 1, 'y': 3 }
    this._show_desc = has_text
    this._desc = text
    this._desc_cnt = 0
  }
  
  setStartPosition( x, y ) {
    this._start.x = x
    this._start.y = y
  }
  
  getObject( x, y ) {
    for( var ii = 0; ii < this._elms.length; ii++ ) {
      if( this._elms[ ii ]._pos.x == x && this._elms[ ii ]._pos.y == y ) {
        return [ true, ii, this._elms[ ii ] ]
      }
    }
    
    return [ false, -1 , undefined ]
  }
  
  addObject( obj, x, y ) {
    var new_elms = this._elms.filter(function(obj, arr){ 
        return obj._pos.x != x || obj._pos.y != y
    })    
    var cx = x
    var cy = y
    x *= this._sz
    y *= this._sz
    x += this._ow
    y += this._oh
    obj.setPosition( x, y, cx, cy )
    new_elms.push( obj )
    this._elms = new_elms
  }
  
  removeObject( ii ) {
    this._elms.splice( ii, 1 )
  }
  
  getDoorTo( room_name ) {
    var x = this._elms.filter( (obj) => {
      return obj._cat == 'doors' && obj._link == room_name
    })
    if( x.length == 1 ) {
      x = x[ 0 ]
      if( x._loc == 'left'   || x._loc == 'l' ) return [ true, x._pos.x + 1, x._pos.y ]
      if( x._loc == 'right'  || x._loc == 'r' ) return [ true, x._pos.x - 1, x._pos.y ]
      if( x._loc == 'top'    || x._loc == 't' ) return [ true, x._pos.x,     x._pos.y + 1 ]
      if( x._loc == 'bottom' || x._loc == 'b' ) return [ true, x._pos.x,     x._pos.y - 1 ]
    } else {
      return [ false, undefined, undefined ]
    }
  }
  
  draw() {
    rectMode( CORNER )
    
    fill( this._color.background )
    stroke( this._color.foreground )
    
    var xi = this._ow
    var yi = this._oh
    for( var ii = 0; ii < this._w; ii++ ) {
      for( var jj = 0; jj < this._h; jj++ ) {
        square( xi + ii * this._sz, yi + jj * this._sz, this._sz )
      }
    }
    
    this._elms.forEach( elm => elm.draw( this._color.foreground, this._color.background ) )
    
    if( this._show_desc >= 1 && this._desc_cnt < this._desc.length ) {
      // clear
      noStroke()
      fill( bkg )
      rect( 0, 14, width, 45 )
      // draw
      textAlign( LEFT, CENTER )
      textSize( 13 )
      textFont( bit_font )
      let clr = "#006699"
      fill( clr )
      noStroke()
      text( '~ ' + this._desc[ this._desc_cnt ], 16, 42)
    }
    
    if( this._show_desc == 1 ) {
      this._show_desc = 0
    }
  }
}