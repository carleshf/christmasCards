
#####                                                                      #####
# BLOCK: STRCUTURAL FUNCTIONS                                                  #
#                                                                              #
#  . txt.wrap                                                                  #
#  . txt.center                                                                #
#  . txt.line                                                                  #
#  . screen.cls                                                                #
#####                                                                      #####

##
# title: txt.wrap
# author: chernandez
# date: 18/09/2014
# description: Function used to wrap a text into the console, creating a block
# with right and left indentations.
################################################################################
txt.wrap <- function( text, width = getOption( "width" ), right.indent = 0, left.indent = 0, chr = " " ) {
    txt    <- paste0( text, collapse = chr )
    txt    <- strsplit( txt, " " )
    rwidth <- width - right.indent - left.indent
    pos    <- 1
    if( right.indent == 0 ) {
        lines <- list( "" )   
    } else {
        lines  <- list( paste0( rep( chr, right.indent ), collapse = "" ) )
    }
    for( word in txt[[ 1 ]] ) {
        if( nchar( lines[[ pos ]] ) + left.indent + nchar( word ) >= width ) {
            pos <- pos + 1
            lines[[ pos ]] <- paste0( rep( chr, right.indent ), collapse = "" )
        }
        lines[[ pos ]] <- paste( lines[[ pos ]], word, collapse = chr )
    }
    return( lines )
}

##
# tiele: txt.center
# author: chernandez
# date: 18/09/2014
# description: Function used to center a text into the console.
################################################################################
txt.center <- function( text, width = getOption( "width" ), chr = " " ) {
    indent       <- width - nchar( text )
    right.indent <- round( indent / 2 )
    left.indent  <- indent - right.indent
    return( paste0( c( 
        rep( chr, right.indent ),
        text,
        rep( chr, left.indent )
    ), collapse = "", sep = "" ) )
    
}

##
# title: txt.line
# author: chernandez
# date: 18/09/2014
# description: Function used to create a 'newline' event on the console.
################################################################################
txt.line <- function( n = 1 ) {
    if( n == 1 ) {
        return( "" )
    } else {
        for( a in 1:n ) {
            return( "\n" )
        }
    }
}

##
# title: screen.cls
# author: chernandez
# date: 18/09/2014
# description: Function used to emulate the efect of a 'cls' (Windows) or a 
# 'clear' (linux) on a terminal with an R session.
################################################################################
screen.cls <- function( chr = "\n", times = "100" ) {
    cat( rep( chr, times ) )
}


#####                                                                      #####
# BLOCK: INTERACTIVE FUNCTIONS                                                 #
#                                                                              #
#  . show                                                                      #
#  . title                                                                     #
#  . ask                                                                       #
#####                                                                      #####

##
# title: show
# author: chernandez
# date: 18/09/2014
# description: given a list of text it shows each on on the console.
################################################################################
show <- function( list ) {
    for( line in list ) {
        if( typeof( line ) == "list" ) {
            show( line )
        } else {
            cat( line, "\n" )
        }
    }
}

##
# title: title
# author: chernandez
# date: 18/09/2014
# description: Given a text is centers it and it draws a line under it.
################################################################################
title <- function( txt, chr = "-", plus = 0 ) {
    txt <- toupper( txt )
    nc <- nchar( txt )
    txt    <- txt.center( txt )
    unline <- txt.center( paste0( rep( chr,  nc + plus ), collapse = "" ) )
    
    return( list( txt, unline ) )
}

##
# title: ask
# author: chernandez
# date: 18/09/2014
# description: Given a text is shows it into the console and wait for an input
# understanded as a key of te keyboards.
################################################################################
ask <- function( text = "", N = 1, type = character() ) {
    if( text != "" ) {
        cat( paste0( " > ", text, "\n" ) )
    }
    return( tolower( suppressMessages( scan( n = N, what = type ) ) ) )
}


#####                                                                      #####
# BLOCK: GAMEPLAY FUNCTIONS                                                    #
#                                                                              #
#  . early_biebie                                                              #
#  . introduction                                                              #
#  . main
#####                                                                      #####

##
# title: early_biebie
# author: chernandez
# date: 18/09/2014
# description: used to say bie-bie to the user whenit says they don't want to 
# play the game after the introduction.
################################################################################
early_biebie <- function() {
    screen.cls()
    show(
        list( 
            txt.wrap( c( "This 'minigame' was developed as a christmas card",
                         "for all the people working at CREAL and related." ),
                      right.indent = 5, left.indent = 5 ),
            txt.line(),
            txt.wrap( c( "I hope I did not bother you and I use this change to",
                         "wish you a marry christmas and a happy new year." ),
                      right.indent = 5, left.indent = 5 ),
            txt.line( 2 ),
            txt.wrap( c( "Carles Hernandez-Ferrer" ), right.indent = 10 )
        )
    )
}

##
# title: introduction
# author: chernandez
# date: 18/09/2014
# description: Used to introduce the game
################################################################################
introduction <- function() {
    show(
        list( title( "an epidemiologic christmas tale", chr = "=", plus = 8 ),
              txt.line(),
              txt.wrap( c( "John Snow (15 March 1813 - 16 June 1858) was an English",
                           "physician and a leader in the adoption of anaesthesia and",
                           "medical hygiene. He is considered one of the fathers of",
                           "modern epidemiology, in part because of his work in",
                           "tracing the source of a cholera outbreak in Soho, London,",
                           "in 1854. His findings inspired fundamental changes in the",
                           "water and waste systems of London, which led to similar",
                           "changes in other cities, and a significant improvement",
                           "in general public health around the world." ),
                        right.indent = 5, left.indent = 5 ),
              txt.wrap( "wikipedia (2014)", right.indent = 10 ),
              txt.line( 2 ),
              title( "Introduction", plus = 8 ),
              txt.line(),
              txt.wrap( c( "In this game you took the role of Patrick Snow, a decendant",
                           "of John Snow, and, as him, an important Epidemiologist." ),
                        right.indent = 5, left.indent = 5 ),
              txt.line(),
              txt.wrap( c( "Patrick Snow gets at Barcelona (Spain) the early ",
                           "morning of December 15th, 2014. While waiting for",
                           "his luggage, a custom officer comes up to to him. The",
                           "officer telld to him that the Department of Health",
                           "of the Generalitat de Catalunya want to deal an urgent",
                           "issue with him." ),
                        right.indent = 5, left.indent = 5 ),
              txt.line()
              
        )
    )
    return( ask( "Do you want to play [Y/*]?" ) )
}

##
# title: main
# author: chernandez
# date: 18/09/2014
# description: Game's structure (story)
################################################################################
main <- function() {
    options( width = 80 )
    
    screen.cls()
    quit <- introduction()
    if( quit == "y" ) {
        
    } else {
        early_biebie()
    }
}

#####                                                                      #####
# BLOCK: ENTRY POINT                                                           #
#####                                                                      #####

main()