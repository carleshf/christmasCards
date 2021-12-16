var global_stage = 'starring'
var _starend_key = 0


var _str_itr = 0
var _str_mod = 0
var _str_col = '#228B22'


const starring = () => {
  ellipseMode( CENTER )
  noStroke()
  fill( _str_col )
  
  circle( width / 2, height / 2, _str_itr * 5 )
  
  noStroke()
  textFont( chrm_font )
  textAlign( CENTER, CENTER )
  
  textSize( 93 )
  fill( '#505050' )
  text( 'Happy Winter Holidays!', 400, 100 )
  
  fill( '#A9A9A9' )
  textSize( 23 )
  text( 'Can you help Noelle to get until the end of the day so she can start her winter break?', 400, 200 )
  text( 'Press "space" to start', 400, 250 )
  
  _str_itr += 1
  if( _str_itr * 5 >= width * 1.5 ) {
    _str_itr = 0
    _str_mod += 1 
    _str_mod %= 4
    _str_col = [ '#228B22', '#F5F5F5', '#B22222', '#F5F5F5' ][ _str_mod ]
  }
  
  if( _starend_key == 13 || _starend_key == 32 ) {
    global_stage = 'game'
  }
}



var _iter_end = 0

const ending = () => {
  
  background('#F5F5F5')
  
  noStroke()
  textFont( chrm_font )
  textAlign( CENTER, CENTER )
  
  textSize( 81 )
  fill( '#8B0000')
  
  text( '(Happy Winter Holidays)', 400, 90 )
  
  _str_col = [ '#228B22', '#F5F5F5', '#B22222', '#F5F5F5' ][ _str_mod ]
  
  textSize( 41 )
  
  fill( '#B22222')
  text( 'Let the spirit of love benevolently fill our heart', 400, 250 )
  text( 'and share the laughter and the cheers.', 400, 300 )
  
  
  fill( '#228B22')
  text( 'Joyful Yuletide!', 250, 400 )
  text( '&', 400, 425 )
  text( 'Happy New Year!', 550, 460 )
  
  textSize( 37 )
  fill( '#808080' )
  text( '(Carles)', 700, 550 )
  
  
  
}