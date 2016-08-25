#!/usr/bin/env python 
# -*- coding: utf-8 -*- 

import curses as cr
import textwrap as tw

# Size of the screen ----------------------------------------------------------
w_w, w_h = 80, 20

# Keys for game-play ----------------------------------------------------------
right_key = (cr.KEY_RIGHT, 100, 68)
left_key = (cr.KEY_LEFT, 97, 65)
down_key = (cr.KEY_DOWN, 115, 83)
up_key = (cr.KEY_UP, 119, 82)
exit_key = (27, )
pause_key = (32, )
accepted_keys = right_key + left_key + down_key + up_key + exit_key + pause_key

# Game Classes ----------------------------------------------------------------
class GameElement():
    def __init__(self, x, y, w, h, l):
        self.x, self.y = x, y
        self.px, self.py = x, y
        self.w, self.h = w, h
        self.level = l

    def draw(slef, win):
        pass

    def update(self, floors, posts):
        pass

    def clean(self, win):
        pass


class Floor(GameElement):
    def __init__(self, x, y, w, l=1):
        GameElement.__init__(self, x=x, y=y, w=w, h=1, l=l)

    def draw(self, win):
        win.addstr(w_h - self.y - 1, self.x + 1, '#' * self.w)
    
    def clean(self, win):
        win.addstr(w_h - self.y - 1, self.x + 1, ' ' * self.w)


class Post(GameElement):
    def __init__(self, x, y, d='s', l=1):
        GameElement.__init__(self, x=x, y=y, w=1, h=4, l=l)
        self.direction = d

    def draw(self, win):
        win.addch(w_h - self.y - 1, self.x + 1, '#')
        win.addch(w_h - self.y - 2, self.x + 1, '#')
        if self.direction == 'r':
            win.addch(w_h - self.y - 3, self.x + 1, '>')
        elif self.direction == 'l':
            win.addch(w_h - self.y - 3, self.x + 1, '<')
        else:
            win.addch(w_h - self.y - 3, self.x + 1, '#')

    def clean(self, win):
        for ii in range(1, 3):
            win.addch(w_h - self.y - ii, self.x + 1, ' ')


class Hat(GameElement):
    def __init__(self, x, y, v=True, l=1):
        GameElement.__init__(self, x=x, y=y, w=3, h=1, l=l)
        self.visible = v

    def draw(self, win):
        if self.visible:
            win.addstr(w_h - self.y - 1, self.x + 1, "_A_")
        else:
            win.addstr(w_h - self.y - 1, self.x + 1, "   ")

    def clean(self, win):
        win.addstr(w_h - self.y - 1, self.x + 1, "   ")

    def is_visible(self):
        return self.visible

    def set_invisible(self):
        self.visible = False


class Door(GameElement):
    def __init__(self, x, y, v=False, l=1):
        GameElement.__init__(self, x=x, y=y, w=4, h=3, l=l)
        self.visible = v

    def set_visible(self):
        self.visible = True

    def get_visible(self):
        return self.visible

    def draw(self, win):
        if self.visible:
            win.addstr(w_h - self.y - 3, self.x + 1, " /\\")
            win.addstr(w_h - self.y - 2, self.x + 1, "|  |")
            win.addstr(w_h - self.y - 1, self.x + 1, "|  |")
        else:
            win.addstr(w_h - self.y - 3, self.x + 1, "    ")
            win.addstr(w_h - self.y - 2, self.x + 1, "    ")
            win.addstr(w_h - self.y - 1, self.x + 1, "    ")

    def clean(self, win):
        for ii in range(1, 3):
            win.addstr(w_h - self.y - ii, self.x + 1, "   ")


class Snowman(GameElement):
    def __init__(self, x, y, d='s', s=1, j=1):
        GameElement.__init__(self, x=x, y=y, w=3, h=2, l=1)
        self.has_hat = False
        self.direction = d
        self.jump = [False, 's', 0]
        self.speed = s
        self.strength = j

    def __jump_inc__(self):
        self.jump[2] += 1
        if self.jump[2] <= 3:
           return self.strength
        else:
           self.jump[1] = 'd'
        return 0

    def __jump__(self):
        if self.jump[0] and self.jump[1] == 's':
            self.jump[1:2] = ['u', 1]
        
        if self.jump[1] == 'u':
            self.y += self.__jump_inc__()
        pass

    def __fall__(self, floors):
        if self.jump[1] != 'u':
            in_floor = False
            for flr in floors:
                if self.x >= flr.x and self.x <= flr.x + flr.w: # in x range
                    if self.y - self.strength == flr.y: # in floor level
                        in_floor = True
                        self.jump = [False, 's', 0]

            if not in_floor:
                self.y -= self.strength

    def draw(self, win):
        win.addstr(w_h - self.py - 2, self.px + 2, " ")
        win.addstr(w_h - self.py - 1, self.px + 1, "   ")
        if self.has_hat:
            win.addstr(w_h - self.py - 3, self.px + 1, "   ")
            win.addstr(w_h - self.y - 3, self.x + 1, "_A_")
        win.addstr(w_h - self.y - 2, self.x + 2, "o")
        win.addstr(w_h - self.y - 1, self.x + 1, "(O)")

    def clean(self, win):
        for ii in range(1, 3):
            win.addstr(w_h - self.y - ii, self.x + 1, "   ")

    def has_hat(self):
        return (self.has_hat)

    def give_hat(self):
        self.has_hat = True

    def set_direction(self, d, user=True):
        if self.direction == 's' and user:
            self.direction = d
        if not user:
            self.direction = d

    def get_direction(self):
        return (self.direction)

    def set_jump(self):
        self.jump[0] = True

    def update(self, floors, posts):
        def check_posts(posts):
            d = self.direction
            for pst in posts:
                if (self.x + self.w + 1 == pst.x or self.x - 1 == pst.x) and self.y == pst.y:
                    d = pst.direction
            return (d)

        self.set_direction(check_posts(posts), False)
        self.px = self.x
        self.py = self.y
        if self.direction == 'r':
            self.x += self.speed
        elif self.direction == 'l':
            self.x -= self.speed

        self.__jump__()
        self.__fall__(floors)


class Text(GameElement):
    def __init__(self, x, y, w, txt):
        self.lines = tw.wrap(txt, width=w)
        GameElement.__init__(self, x, y, w, h=len(self.lines), l = 1)

    def draw(self, win):
        nl = len(self.lines)
        for ii in range(0, nl):
            win.addstr(self.py + ii, self.px + 1, self.lines[ii])

    def clean(self, win):
        nl = len(self.lines)
        for ii in range(0, nl):
            win.addstr(self.py + ii, self.px + 1, " " * len(self.lines[ii]))


class Map:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.floors = []
        self.posts = []
        self.text = []
        self.hat, self.snowman, self.door = None, None, None

    def add_floor(self, elm):
        self.floors.append(elm)

    def add_post(self, elm):
        self.posts.append(elm)

    def add_hat(self, elm):
        self.hat = elm

    def add_snowman(self, elm):
        self.snowman = elm

    def add_door(self, elm):
        self.door = elm

    def add_text(self, elm):
        self.text.append(elm)

    def draw_map(self, win):
        for elm in self.floors + self.posts + [self.hat, self.door, self.snowman]:
            elm.draw(win)
        for elm in self.text:
            elm.draw(win)

    def clean_map(self, win):
        for elm in [self.door, self.snowman, self.hat] + self.floors + self.posts + self.text:
            elm.clean(win)

    def get_direction(self):
        return (self.snowman.get_direction())

    def update(self, key):
        def give_hat(sm, ht):
            return (sm.x + sm.w < ht.x + ht.w and
                    sm.x + sm.w > ht.x and
                    sm.y == ht.y)

        def got_door(sm, dr):
            return (sm.x + sm.w < dr.x + dr.w and
                    sm.x + sm.w > dr.x and
                    sm.y == dr.y and dr.get_visible())

        if key in left_key:
            self.snowman.set_direction('l')
        elif key in right_key:
            self.snowman.set_direction('r')

        if key in up_key:
            self.snowman.set_jump()

        if give_hat(self.snowman, self.hat):
            self.snowman.give_hat()
            self.hat.set_invisible()
            self.door.set_visible()
        if got_door(self.snowman, self.door):
            return True
        for elm in [self.hat, self.door, self.snowman]:
            elm.update(self.floors, self.posts)
        return False


# Game Functions --------------------------------------------------------------

def base_map():
    map_g = Map(w_w - 1, w_h - 1)
    map_g.add_floor(Floor(1, 1, 76))
    map_g.add_post(Post(1, 2, 'r'))
    map_g.add_post(Post(76, 2, 'l'))
    return (map_g)

def create_level_one():
    map_g = base_map()
    map_g.add_door(Door(22, 2))
    map_g.add_hat(Hat(43, 2))
    map_g.add_snowman(Snowman(10, 2))
    map_g.add_text(Text(3, 2, 40, "Use arrow keys to set the direction of the snowman. Help him to find the hat he lost."))
    return (map_g)

def create_level_two():
    map_g = base_map()
    map_g.add_floor(Floor(30, 3, 15))
    map_g.add_floor(Floor(40, 5, 9))
    map_g.add_door(Door(10, 2))
    map_g.add_hat(Hat(43, 6))
    map_g.add_snowman(Snowman(10, 2))
    map_g.add_text(Text(3, 2, 40, "The up-arrow key makes the Snowman jumps!"))
    return (map_g)

def create_level_three():
    map_g = base_map()
    map_g.add_floor(Floor(22, 3, 5))
    map_g.add_floor(Floor(27, 4, 5))
    map_g.add_floor(Floor(32, 5, 2))
    map_g.add_post(Post(32, 2, 'l'))
    map_g.add_post(Post(33, 2, 'r'))
    map_g.add_floor(Floor(34, 4, 5))
    map_g.add_floor(Floor(40, 3, 5))
    map_g.add_door(Door(50, 2))
    map_g.add_hat(Hat(60, 2))
    map_g.add_snowman(Snowman(10, 2))
    map_g.add_text(Text(3, 2, 40, "Take care of the direction-post, you can get trapped between theme!"))
    return (map_g)

def create_level_four():
    map_g = base_map()
    map_g.add_floor(Floor(44, 3, 10))
    map_g.add_floor(Floor(54, 4, 6))
    map_g.add_floor(Floor(60, 3, 10))
    map_g.add_door(Door(55, 5))
    map_g.add_hat(Hat(10, 2))
    map_g.add_snowman(Snowman(35, 2))
    map_g.add_text(Text(3, 2, 40, "You are at your own now..."))
    return(map_g)

def create_level_five():
    map_g = base_map()
    map_g.add_floor(Floor(33, 3, 6))

    map_g.add_floor(Floor(29, 4, 4))
    map_g.add_floor(Floor(39, 4, 4))

    map_g.add_floor(Floor(23, 5, 6))
    map_g.add_post(Post(23, 6, 'r'))
    map_g.add_floor(Floor(43, 5, 6))
    map_g.add_post(Post(48, 6, 'l'))

    map_g.add_floor(Floor(29, 6, 4))
    map_g.add_floor(Floor(39, 6, 4))
    
    map_g.add_floor(Floor(33, 7, 6))
    
    map_g.add_floor(Floor(29, 8, 4))
    map_g.add_floor(Floor(22, 9, 7))

    map_g.add_floor(Floor(39, 8, 4))
    map_g.add_floor(Floor(43, 9, 7))

    map_g.add_door(Door(45, 10))
    map_g.add_hat(Hat(25, 10))
    map_g.add_snowman(Snowman(20, 2))
    map_g.add_text(Text(3, 2, 40, "You are at your own now..."))
    return(map_g)


def init_curses():
    '''Function to initialize curses environment'''
    cr.initscr()
    cr.noecho()
    cr.curs_set(0)

def create_win(w, h, x=0, y=0):
    '''Creates the windows the game will use'''
    win = cr.newwin(h, w, x, y)
    win.keypad(1)
    win.border(0)
    win.nodelay(1)
    return (win)


def update(win, map_g, key):
    status = map_g.update(key)
    map_g.draw_map(win)
    # if map_g.get_direction() == 's':
    #     st = 'Snowman is waiting (' + str(key) + ')'
    # elif map_g.get_direction() == 'r':
    #     st = 'Snowman is moving right (' + str(key) + ')'
    # elif map_g.get_direction() == 'l':
    #     st = 'Snowman is moving left (' + str(key) + ')'
    # elif map_g.get_direction() == 'u':
    #     st = 'Snowman is jumping (' + str(key) + ')'
    # else:
    #     st = "Bad: " + str(map_g.get_direction())
    # win.addstr(1, 1, st)
    # win.addstr(1, 1,
    #     "x: %d y: %d px: %d py: %d :: d: %s :: j1 : %r, j2: %s, j3: %d" % (map_g.snowman.x, map_g.snowman.y, 
    #         map_g.snowman.px, map_g.snowman.py, map_g.snowman.direction, map_g.snowman.jump[0],
    #         map_g.snowman.jump[1], map_g.snowman.jump[2]))
    win.timeout(100)
    return status


def game_loop(win, w, h):
    key, end = cr.KEY_DOWN, False
    story = [create_level_one, create_level_two, create_level_three, create_level_four,create_level_five]
    lvl = 0

    while not end and lvl < 5:
        map_g = story[lvl]()
        status = False
        while not status and not end:
            win.addstr(1, 68, "Level: %d/5" % (lvl + 1))
            
            if key in exit_key:
                end = True

            status = update(win, map_g, key)
            
            key = win.getch()
            if key not in accepted_keys:
                key = cr.KEY_DOWN
        map_g.clean_map(win)
        lvl += 1


if __name__ == '__main__':
    #try:
    init_curses()
    win = create_win(w_w, w_h)
    game_loop(win, w_w, w_h)
    cr.endwin()

    print("end!")
#except:
#	event = None
#	cr.endwin()
