
show_paired <- function( cards ) {
    pair <- 0
    for( ii in seq( 1, length( cards ), 2 ) ) {
        if( pair %in% c( 4, 8, 12, 16, 20, 24 ) ) {
            cat( "\n" )
        }
        if ( pair > 8 ) {
            cat( paste0( pair + 1, ") ", cards[ ii ], " ", cards[ ii + 1 ], "   " ) )
        } else {
            cat( paste0( " ", pair + 1, ") ", cards[ ii ], " ", cards[ ii + 1 ], "   " ) )
        }
        pair <- pair + 1
    }
    cat( "\n" )
}

ask <- function( text = "", N = 1, type = double() ) {
    if( text != "" ) {
        cat( paste0( text, "\n" ) )
    }
    return( scan( n = N, what = type ) )
}

cls <- function( chr = "\n", times = "100" ) {
    cat( rep( chr, times ) )
}

say <- function( txt ) {
    for( line in strwrap( txt ) ) {
         cat( paste0( line, "\n" ) )
    }
}

show_grid <- function( cards ) {
    mm <- matrix( c(
        c(  1,  3,  5, 10 ),
        c( 20, 12, 15, 13 ),
        c(  7,  4, 17, 14 ),
        c(  8,  9,  6, 19 ),
        c( 11, 10,  2, 18 )
    ), nrow = 5, byrow = TRUE )
    nr <- 0
    tt <- vector()
    for( ii in 1:nrow( mm ) ) {
        rr <- sample( mm[ ii, ], ncol( mm ) )
        cat( paste0( nr + 1, " -> " ) )
        for( jj in 0:sqrt( length( cards ) ) ) {
            cat( paste0( cards[ rr[ jj ] ], "  " ) )
            cat( paste0( rr[ jj ], "  " ) )
        }
        cat( "\n" )
        nr <- nr + 1
        tt <- c( tt, rr )
    }
    return( matrix( tt, nrow = 5, byrow = TRUE ) )
}



ctypes <- c( "♥", "♣", "♠", "♦" )
cnums  <- c( c( "A", "J", "Q", "K", as.character( 1:9 ) ) )

cards <- apply( expand.grid( ctypes, cnums )[ sample( 52, 24 ), ], 1, function( x ) paste0( x[ 2 ], x[ 1 ] ) )
names( cards ) <- 1:24


# Step 1
cls()
say( "Hello! As this year, as achristmas card I sent you a triky card game. Hope you enjoy as I enjoyed typing it." )
say( "" )
say( "Let's start with it!" )
say( "" )
say( "" )
say( "Now I will show you 8 paired cards. Just memorize a single pair and let's see if I'm able to got them :-)" )
say( "" )
show_paired( cards )
say( "" )
ask( "Press return to continue", type = character() )

# Step 2
cls()
say( "No I will try to guess the paired cars." )
say( "" )
say( "Please give me some help..." )
say( "" )
mm <- show_grid( cards )
say( "" )
r.1 <- ask( "Give me the row where one (or both) of your cards is placed" )

if( length( r.1 ) == 0 ) {
    ask( "Thanks for playing!" )
    cls()
} else {
    r.2 <- ask( "Give me the row where the other of your cads is placed (if both are in the same row, press return)" )
    nn <- c( mm[ r.1, ], mm[ r.2, ] )
    nn <- nn[ order( nn ) ]
    it <- -1
    for( ii in 1:length( nn ) ) {
        if( nn[ ii ] == ( nn[ ii+1 ] - 1 ) ) {
            it <- ii
            break
        }
    }
    say( paste0( "your cards where ", cards[ it ], " and ", cards[ it + 1 ] ) )
}     

