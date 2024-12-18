class Player {
  constructor( x, y ) {
    this._x = x
    this._y = y
    this._symbol = '🧝'
    this._inventory = new Inventory()
  }
  
  draw( ox, oy, sz ) {
    let szi = sz + 2
    let szj = sz + 1
    text( this._symbol, ox + szj * this._y, oy + szi * ( this._x + 1 ) )
  }
  
  drawInventory( ox, oy, sz ) {
    textSize( 23 )
    textFont( font )
    var x = this._inventory._collection[ Object.getOwnPropertyNames( this._inventory._collection )[ 0 ] ]._desc
    var y = []
    if( x.length < 69 ) {
      y.push( x )
    } else {
      var cnt = 0
      do {
        y.push( x.slice( cnt, cnt + 68 ).trim() )
        cnt += 68
      } while( cnt < x.length )
    }
    y.forEach( (x, idx) => { 
      text( x, ox / 2, oy / 2 + idx * 20 )  
    } )
    
    textFont( 'Courier New' )
  }
  
  move( key ) {
    if( key == 'ArrowUp' )    { this._x -= 1 }
    if( key == 'ArrowDown' )  { this._x += 1 }
    if( key == 'ArrowRight' ) { this._y += 1 }
    if( key == 'ArrowLeft' )  { this._y -= 1 }
  }
  
  addInventory( keyItem, initialValue, printable = true ) {
    var x = this._inventory.add( keyItem, initialValue, printable )
    if( !x ) {
      x = this._inventory.update( keyItem, initialValue )
    }
    return x
  }
  
  deleteInventory( keyItem ) {
    return this._inventory.delete( keyItem )
  }
  
  checkInventiory( keyItem, condition, convFun = parseInt ) {
    return this._inventory.check( keyItem, condition, convFun )
  }
}




class Inventory {
  constructor() {
    this._collection = { }
  }
  
  add( keyItem, description, initialValue = 0, printable = true, completed = false ) {
    if( Object.getOwnPropertyNames( this._collection ).indexOf( keyItem ) !== -1 ) {
      console.log( '[ERROR]: Trying to add an item into the inventory that already exists' )
      return false
    } else {
      this._collection[ keyItem ] = { _desc: description, _val: initialValue, _comp: completed, _print: printable }
      return true
    }
  }
  
  delete( keyItem ) {
    if( Object.getOwnPropertyNames( this._collection ).indexOf( keyItem ) === -1 ) {
      console.log( '[ERROR]: Trying to remove an item from the inventory that does not exists' )
      return false
    } else {
      delete this._collection[ keyItem ]
      return true
    }
  }
  
  update( keyItem, newValue ) {
    if( Object.getOwnPropertyNames( this._collection ).indexOf( keyItem ) !== -1 ) {
      this._collection[ keyItem ]._val = newValue
    } else {
      console.log( '[ERROR]: Trying to update an item into the inventory that does not exists' )
      return false
    }
  }
  
  check( keyItem, condition, convFun = parseInt ) {
    // conditions:
    //   'e' -> exists
    //   '=[value]' -> equal to [value]
    //   '![value]' -> different than [value]
    
    if( condition.startsWith( 'e' ) ) {
      return Object.getOwnPropertyNames( this._collection ).indexOf( keyItem ) !== -1
    }
    if( condition.startsWith( '=' ) ) {
      let value = convFun( condition.substring( 1 ) )
      console.log( '=', condition, value )
      return this._collection[ keyItem ] == value
    }
    if( condition.startsWith( '!' ) ) {
      let value = convFun( condition.substring( 1 ) )
      console.log( '!', condition, value )
      return this._collection[ keyItem ] != value
    }
    
    return false
  }
  
  toString() {
    let x = Object.entries( this._collection )
    return JSON.stringify( x )
  }
}