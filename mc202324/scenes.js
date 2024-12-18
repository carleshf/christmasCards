class Starring {
  constructor() {
    
  }
  
  draw( objs ) {
    background( 230 )
    
    textFont( font )
    
    textSize( 23 )
    fill( 'limegreen' )
    text( 'Welcome to', 350, 200 )  
    
    textSize( 39 )
    fill( 'tomato' )
    text( 'An Elf Christmas Tale (2)', 210 , 250 )  
    
    textSize( 13 )
    fill( 'limegreen' )
    text( 'Press \'up\' to start', 350, 290 )
    
    fill( 'black' )
  }
  
  keyPressed( key ) {
    console.log( key )
    if( key == 'ArrowUp' || key == 'w' || key == 'W' ) {
      update_state( 1 )
      force_draw()
    }
  }
}


class Ending {
  constructor() {
    
  }
  
  draw( objs ) {
    background( 230 )
    
    textFont( font )
    textSize( 39 )
    fill( 'royalblue' )
    text( 'Thanks for playing!', 80, 110 )
    text( 'I hope you enjoyed this little story.', 80, 150 )
    
    
    textSize( 39 )
    fill( 'limegreen' )
    text( 'May our hearts be embraced by the spirit of love,', 25, 250 )
    text( 'as we share laughter and cheers.', 25, 290 )  
    
    textSize( 39 )
    fill( 'tomato' )
    text( 'Joyful Yuletide!', 350 , 350 )  
    
    textSize( 39 )
    fill( 'tomato' )
    text( 'Happy New Year!', 350, 390 )
    
    
    textSize( 39 )
    fill( 'royalblue' )
    text( '~Carles', 80, 450 )
    
    fill( 'black' )
  }
  
  keyPressed( key ) { }
}