#!/usr/bin/env python 
# -*- coding: utf-8 -*- 

import curses as cr

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

class Floor(GameElement):
	def __init__(self, x, y, w, l = 1):
		GameElement.__init__(self, x = x, y = y, w = w, h = 1, l = l)
	def draw(self, win):
		win.addstr(w_h - self.y - 1, self.x + 1, '#' * self.w)

class Post(GameElement):
	def __init__(self, x, y, d = 's', l = 1):
		GameElement.__init__(self, x = x, y = y, w = 1, h = 4, l = l)
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

class Hat(GameElement):
	def __init__(self, x, y, v = True, l = 1):
		GameElement.__init__(self, x = x, y = y, w = 3, h = 1, l = l)
		self.visible = v
	def draw(self, win):
		if self.visible:
			win.addstr(w_h - self.y - 1, self.x + 1, '_¬_')
		else:
			win.addstr(w_h - self.y - 1, self.x + 1, '   ')
	def is_visible(self):
		return self.visible
	def set_invisible(self):
		self.visible = False

class Door(GameElement):
	def __init__(self, x, y, v = True, l = 1):
		GameElement.__init__(self, x = x, y = y, w = 4, h = 3, l = l)
		self.visible = False
	def set_visible(self):
		self.visible = True
	def draw(self, win):
		if self.visible:
			win.addstr(w_h - self.y - 3, self.x + 1, ' /\\')
			win.addstr(w_h - self.y - 2, self.x + 1, '|  |')
			win.addstr(w_h - self.y - 1, self.x + 1, '|  |')
		else:
			win.addstr(w_h - self.y - 3, self.x + 1, '    ')
			win.addstr(w_h - self.y - 2, self.x + 1, '    ')
			win.addstr(w_h - self.y - 1, self.x + 1, '    ')

class Snowman(GameElement):
	def __init__(self, x, y, d = 's', s = 1):
		GameElement.__init__(self, x = x, y = y, w = 3, h = 2, l = 1)
		self.has_hat = False
		self.direction = d
		self.speed = s
	def draw(self, win):
		win.addstr(w_h - self.py - 1, self.px + 1, '   ')
		if self.has_hat:
			win.addstr(w_h - self.py - 3, self.px + 1, '   ')
			win.addstr(w_h - self.y - 3, self.x + 1, '_¬_')
		win.addstr(w_h - self.y - 2, self.x + 1, ' o ')
		win.addstr(w_h - self.y - 1, self.x + 1, '(O)')
	def has_hat(self):
		return(self.has_hat)
	def give_hat(self):
		self.has_hat = True
	def set_direction(self, d):
		self.direction = d
	def get_direction(self):
		return(self.direction)
	def update(self, floors, posts):
		def check_posts(posts):
			d = self.direction
			for pst in posts:
				if (self.x + self.w + 1 == pst.x or self.x - 1 == pst.x) and self.y == pst.y:
					d = pst.direction
			return(d)
		self.direction = check_posts(posts)
		if self.direction == 'r':
			self.px = self.x
			self.x += self.speed
		elif self.direction == 'l':
			self.px = self.x
			self.x -= self.speed


class Map:
	def __init__(self, w, h):
		self.w, self.h = w, h
		self.floors = []
		self.posts = []
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
	def draw_map(self, win):
		for elm in self.floors + self.posts + [self.hat, self.door, self.snowman]:
			elm.draw(win)
	def get_direction(self):
		return(self.snowman.get_direction())
	def update(self, key):
		def give_hat(sm, ht):
			return(sm.x + sm.w < ht.x + ht.w and
				sm.x + sm.w > ht.x and
				sm.y == ht.y)
		def got_door(sm, dr):
			return(sm.x + sm.w < dr.x + dr.w and
				sm.x + sm.w > dr.x and
				sm.y == dr.y)
		if self.get_direction() in ('s', 'u'):
			if key in left_key:
				self.snowman.set_direction('l')
			elif key in right_key:
				self.snowman.set_direction('r')
		if self.get_direction() in ('l', 'r'):
			if key in up_key:
				self.snowman.set_direction('u')
			elif key in down_key:
				self.snowman.set_direction('s')
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

def create_level_one():
	map_g = Map(w_w - 1, w_h - 1)
	map_g.add_floor(Floor(1, 1, 45))
	map_g.add_post(Post(1, 2, 'r'))
	map_g.add_post(Post(45, 2, 'l'))
	map_g.add_door(Door(3, 2))
	map_g.add_hat(Hat(40, 2))
	map_g.add_snowman(Snowman(15, 2))
	return(map_g)

def init_curses():
	'''Function to initialize curses environment'''
	cr.initscr()
	cr.noecho()
	cr.curs_set(0)
	#cr.start_color()
	#cr.use_default_colors()
	#cr.init_pair(1, cr.COLOR_WHITE, -1)
	#cr.init_pair(2, cr.COLOR_RED,   -1)
	#cr.init_pair(3, cr.COLOR_GREEN, -1)

def create_win(w, h, x=0, y=0):
	'''Creates the windows the game will use'''
	win = cr.newwin(h, w, x, y)
	win.keypad(1)
	win.border(0)
	win.nodelay(1)
	return(win)

def update(win, map_g, key):
	map_g.update(key)
	map_g.draw_map(win)
	if map_g.get_direction() == 's':
		st = 'Snowman is waiting (' + str(key) + ')'
	elif map_g.get_direction() == 'r':
		st = 'Snowman is moving right (' + str(key) + ')'
	elif map_g.get_direction() == 'l':
		st = 'Snowman is moving left (' + str(key) + ')'
	elif map_g.get_direction() == 'u':
		st = 'Snowman is jumping (' + str(key) + ')'
	else:
		st = "Bad: " + str(map_g.get_direction())
	win.addstr(1, 1, st)
	win.addstr(2, 1, "x: %d y: %d px: %d py: %d" % (map_g.snowman.x, map_g.snowman.y, map_g.snowman.px, map_g.snowman.py))
	win.timeout(100)

def game_loop(win, w, h):
	key, end = cr.KEY_DOWN, False
	map_g = create_level_one()

	while key not in exit_key and not end:
		end = update(win, map_g, key)

		prevKey = key
		key = win.getch()

		if key not in accepted_keys:
			key = prevKey


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

