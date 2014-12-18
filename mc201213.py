#!/usr/bin/python2.7
# coding: utf-8

"""
@author: Carles Hernandez-Ferrer
@contact: carles.hernandez@gmail.com
@date: Dec 15, 2012
"""


from turtle import *


line1 = [109, 101, 114, 114, 121, 32, 99, 104, 114, 105, 115, 116, 109, 97, 115]
line2 = [97, 110, 100, 32, 97, 32, 104, 97, 112, 112, 121, 32, 110, 101, 119, 32, 121, 101, 97, 114]
line3 = [98, 121, 32, 99, 97, 114, 108, 101, 115]
length = 300.0
level = 4


# I have a code snippet with this piece of code
# I could no remember where I get it.
def snowflake( length, level ):
    if level == 0:
        forward( length )
        return
    length = length / 3.0
    snowflake( length, level-1 )
    left( 60 )
    snowflake( length, level-1 )
    right( 120 )
    snowflake( length, level-1 )
    left( 60 )
    snowflake( length, level-1 )


def cc_full_snowflake( length, level ):
    for i in range( 3 ):
        snowflake( length, level )
        right( 120 )


def cc_message():
    tp = ( -36, -70, line1 ), ( -46, -90, line2 ), ( 0, -110, line3 )
    for x, y, msg in tp:
        penup()
        goto( x, y )
        write( reduce( lambda x, y: x + y, map( lambda x: chr( x ), msg ) ) )


def cc_setup():
    setup( 600, 600 )
    speed( 0 )
    wn = Screen()
    wn.bgcolor( 'lightgreen' )
    wn.title( 'christmas card' )


if __name__ == "__main__":
    cc_setup()
    penup()
    backward( length / 2.0 )
    pendown()
    cc_full_snowflake( length, level )
    cc_message()
    raw_input( 'Press any key to end the program...' )
