#!/usr/bin/python2.7
# coding: utf-8

"""
@author: Carles Hernandez-Ferrer
@contact: carles.hernandez@gmail.com
@date: Dec 18, 2013
"""


from turtle import *

santa = (
    ((26, 25), (24, 34), (18, 38), (7, 33), (4, 25), (7,24), (9, 28), (14, 33)),
    ((6, 18), (4, 18), (4, 21), (7, 24), (12, 26), (22, 26), (26, 25), (28, 23), (28, 20), (26, 19), (24, 20), (22, 21), (11, 21), (9, 20), (6, 18)),
    ((4, 25), (1, 22), (1, 19), (5, 17), (6, 17)),
    ((6, 18), (6, 17), (6, 8), (10, 2), (16, 1), (22, 2), (26, 8), (26, 19)),
    ((9, 20), (9, 14), (12, 11), (15, 12), (17, 12), (20, 11), (24, 14), (24, 20)),
    ((12, 8), (14, 8), (16, 10), (18, 8), (20, 8)),
    ((14, 8), (15, 7), (17, 7), (18, 8)),
    ((15, 9), (16, 8), (17, 9)),
    ((15, 15), (14, 14), (14, 13), (15, 12), (17, 12), (18, 13), (18, 14), (17, 15)),
    ((11, 21), (10, 20), (10, 18), (12, 19), (15, 19), (15, 21)),
    ((17, 20), (17, 19), (20, 19), (22, 18), (22, 20), (21, 20)),
    ((10 ,16), (12, 18), (15 ,18)),
    ((17, 18), (20, 18), (22, 16)),
    ((11, 17), (12, 16), (13, 16), (14, 17), (14, 18)),
    ((18, 18), (18, 17), (19, 16), (20, 16), (21, 17))
)

factor = lambda p: ((p[0] * 300/30) - 150, (p[1] * 300/40)-150)

def cc_setup():
    setup( 600, 600 )
    speed( 0 )
    wn = Screen()
    wn.bgcolor( 'lightgreen' )
    wn.title( 'christmas card' )

def cc_draw_line(line):
    start = line[1]
    penup()
    goto(factor(start))
    pendown()
    for point in line:
        goto(factor(point))

def cc_santa():
    for line in santa:
        cc_draw_line(line)


def cc_message():
    penup()
    goto(-35, 210)
    write("Merry Christmas")
    goto(-40, 195)
    write("and Happy New Year")
    goto(40, -200)
    write("by Carles")


if __name__ == "__main__":
    cc_setup()
    penup()
    goto((0,0))
    pendown()
    cc_santa()
    cc_message()
    raw_input( 'Press any key to end the program...' )
