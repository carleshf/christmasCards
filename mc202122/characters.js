class Character {
  constructor( x, y, cl ) {
    this.x = x
    this.y = y
    this._color = cl
    this._inv = {}
  }
  
  draw ( obj ) {
    ellipseMode( CENTER )
    fill( this._color )
    noStroke()
    circle(obj.x, obj.y - 7, 10)
    circle(obj.x, obj.y + 5, 20)
  }
}


class PC extends Character {
  constructor( x, y, cl = '#000000' ) {
    super( x, y, cl )
    this._inv = {
      'accum': 0,
      'presents': 0,
      'keys': { 
        'purple': false, 
        'red':    false, 
        'blue':   false, 
        'yellow': false, 
        'green':  false, 
        'white':  false, 
        'black':  false 
      },
      'special': {
        'angel': false,
        'joy': false,
        'yule': false,
      }
    }
  }
  
  addObject( obj ) {
    let label = obj._cat
    switch( label ) {
      case 'presents':
        this._inv[ label ] += 1
        break
      case 'keys':
        this._inv[ label ][ obj._col ] = true
        break
    }
  }
    
  useKey( clr ) {
    if( this._inv[ 'keys' ][ clr ] ) {
      this._inv[ 'keys' ][ clr ] = false
      return true
    } else {
      return false
    }
  }
  
  getInventary() {
    var rst = {
      'presents': this._inv[ 'presents' ],
      'keys': this._inv[ 'keys' ],
      'accum': this._inv[ 'accum' ],
    }
    return rst
  }
    
  usePresent( cnt ) {
    if( cnt > 0 && cnt <= this._inv[ 'presents' ] ) {
      this._inv[ 'presents' ] -= cnt
      this._inv[ 'accum' ] += cnt
    }
  }
}

class NPC {
  constructor(x, y, color ) {
    this._pos = { 'x': x, 'y': y }
    this._color = color
    this._loc = { 'x': x, 'y': y }
    this._collect = false
    this._cat = 'npc'
    this._cnt = -1
  }
  
  draw () {
    var of = cellsize / 2
    ellipseMode( CENTER )
    fill( this._color )
    noStroke()
    circle(this._loc.x + of, this._loc.y - 7 + of, 10)
    circle(this._loc.x + of, this._loc.y + 5 + of, 20)
  }
  
  setPosition(x, y, cx, cy) {
    this._pos.x = cx
    this._pos.y = cy
    this._loc.x = x
    this._loc.y = y
  }
}


const _displayText = (arr, idx) => {
  // clear
  noStroke()
  fill( bkg )
  rect( 0, 59, width, 66 )
  
  let clr = "#006699"
  fill( clr )
  noStroke()
  text('> ' + arr[ idx ], 16, 65)
}
  
  
class NpcBoss extends NPC {
  constructor( x, y ) {
    super( x, y, "#90EE90" )
    this._steps = [ false, false, false, false, false ]
  }
  
  interact( player ) {
    // Step 1 - Collect 5 present to get the green key
    if( !this._steps[ 0 ] && player.getInventary()[ 'presents' ] < 5 ) {
      _displayText( [ 'Noelle, can you please help me collect the 18 presents for the team?' ], 0 )
    }
    if( !this._steps[ 0 ] && player.getInventary()[ 'presents' ] == 5 ) {
      _displayText([
        'Thanks Noelle. I think you need some keys to get to the other ones. You can have mine.'
      ], 0 )
      this._steps[ 0 ] = true
      player.usePresent( 5 )
      player._inv.keys.green = true
    }
    // Step 2 - Get the 2 extra presents to know to how you have to ask for the red key
    if( this._steps[ 0 ]  && !this._steps[ 1 ] && player.getInventary()[ 'presents' ] == 1 ) {
      this._steps[ 1 ] = true
      player.usePresent( 1 )
      player._inv.special.angel = true
      _displayText( [ 'I think Angel has the key to continue your present hunting adventure.' ], 0 )
    }
    // Step 3 - Get 4 presents and tall to talk with Joy
    if( this._steps[ 1 ] && !this._steps[ 2 ] && player.getInventary()[ 'presents' ] == 4 ) {
      this._steps[ 2 ] = true
      player.usePresent( 4 )
      player._inv.special.joy = true
      _displayText( [ 'This new employee, Joy, has the key you need!' ], 0 )
    }
    // Step 4
    if( this._steps[ 2 ] && !this._steps[ 3 ] && player.getInventary()[ 'presents' ] == 7 ) {
      this._steps[ 3 ] = true
      player.usePresent( 7 )
      player._inv.special.yule = true
      _displayText( [ 'There is a missing present! Ask arround to see if anyone know where it is!' ], 0 )
    }
    // Step 5
    if( this._steps[ 3 ] && !this._steps[ 4 ] && player.getInventary()[ 'presents' ] == 1 ) {
      this._steps[ 4 ] = true
      player.usePresent( 1 )
      _displayText( [ 'Thanks for your effort Noelle! Happy winter break! (Press enter)' ], 0 )
    }
    // Ending
    if( this._steps[ 4 ] ) {
      global_flag = 'end'
    }
  }
}

class NpcAngel extends NPC {
  constructor( x, y ) {
    super( x, y, "#FFFAFA" )
  }
  
  interact( player ) {
    if( !player._inv.special.angel && !player._inv.special.yule ) {
      _displayText( [ 'Hi Noelle!' ], 0 )
    } else if( player._inv.special.angel ) {
      player._inv.keys.blue = true
      _displayText( [ 'Of coure that you can have my key Noelle. Thanks for all the hard work!' ], 0 )
      player._inv.special.angel = false
    } else if( player._inv.special.yule ) {
      _displayText( [ 'I\'m sorry, but I don\'t know where the missing presnt is.' ], 0 )
    }
  }
}

class NpcMaria extends NPC {
  constructor( x, y ) {
    super( x, y, "#FF69B4" )
  }
  interact( player ) {
    // Step 1 - No flag active
    if( !player._inv.special.angel && !player._inv.special.yule ) {
      _displayText( [ 'Good day, Noelle!'] , 0 )
    } else if( player._inv.special.yule ) {
      _displayText( [ 'I\'m sorry, but I don\'t know where the missing present is.' ], 0 )
    } else if( player._inv.special.angel ) {
      _displayText( [ 'Noelle, I\'m Maria not Angel.' ] , 0 )
    }
  }
}

class NpcJoy extends NPC {
  constructor( x, y ) {
    super( x, y, "#FF8C00" )
  }
  interact( player ) {
    if( !player._inv.special.joy && !player._inv.special.yule ) {
      _displayText( [ 'Hello! I\'m new here! I\'m Joy.'] , 0 )
    } else if( player._inv.special.joy ) {
      _displayText( [ 'Oh! You need my key? Have it!' ] , 0 )
      player._inv.keys.red = true
      player._inv.special.joy = false
    } else if( player._inv.special.yule ) {
      _displayText( [ 'I\'ve seen no one taking the presents.' ] , 0 )
    }
  }
}

class NpcYule extends NPC {
  constructor( x, y ) {
    super( x, y, "#98FB98" )
  }
  interact( player ) {
    // Step 1 - No flag active
    if( !player._inv.special.yule ) {
      _displayText( [ 'Hello! How are you doing?'] , 0 )
    } else {
      _displayText( [ 'Oh! Are you colleting the presents? Sorry, I took one. Here it is!' ] , 0 )
      player._inv.presents += 1
      player._inv.special.yule = false
    }
  }
}