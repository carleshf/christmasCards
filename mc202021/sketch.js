let snowflakes = []
let options = "ABGHILMNQRSTUVXabfgklmnopqry0135678".split('')
let selected = ''
let flag1 = false
let flag2 = false
let flag3 = false
let cnt = 0
let font1, font2, font3
let fontsizeXS = 11
let fontsizeL = 47
let fontsizeXL = 79
let fontsize3XL = 113

let longpress = true


function preload() {
	// https://www.dafont.com/snowy-christmas.font
	let f1 = loadFont('assets/Snowy Christmas - Personal Use.otf')
	// https://www.dafont.com/waving-at-christmas.font
	let f2 = loadFont('assets/Waving at Christmas.ttf')
	// https://www.dafont.com/merry-christmas-go.font
	let f3 = loadFont('assets/Merry Christmas Go.ttf')

	font1 = new TextType(f2, fontsizeXL)
	font2 = new TextType(f1, fontsizeL)
	font3 = new TextType(f3, fontsize3XL)
}


function setup() {
	createCanvas(windowWidth, windowHeight)
	print(navigator.userAgent)
	if(navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('Android') != -1) {
		longpress = false
	}
}

function draw() {
	background('#800000')
	let t = frameCount / 60; // update time
  
  	// crate and update snowflakes
	for (let i = 0; i < random(5); i++) {
		snowflakes.push(new Snowflake())
	}
	for (let flake of snowflakes) {
		flake.draw(t)
	}
  
	// show message only once the first flake touched the end of the screen
	if(flag1 && !flag3) {
		font2.draw(windowWidth / 2, windowHeight / 4, '(Press the screen to get your present)')
	}

	// if screen is touched, reduce de delay
	if(flag1 && flag2) {
		cnt += 1
	}

	// if delay ended, select present
	if(cnt >= 100 && !flag3 && flag1) {
		flag3 = true
		selected = random(options)
	}

	// if delay ended, show present and merry message
	if(flag3) {
		font1.draw(windowWidth / 2, windowHeight * 3 / 4, 'Merry Yuletide!')
		font3.draw(windowWidth / 2, windowHeight / 2, selected)
		if(longpress) {
			font2.draw(windowWidth / 2 + 200, windowHeight * 3 / 4 + 100, '(Carles)')
		} else {
			font2.draw(windowWidth / 2, windowHeight * 3 / 4 + 100, '(Carles)')
		}
	}
}

function mouseReleased() {
	// if mouse released reset delay
	flag2 = false
	cnt = 0
}

function mousePressed() {
	if(longpress) {
		// if mouse pressed start reducing delay
		flag2 = true
	} else {
		// in mobile, if screen pressed show present
		if(flag1) {
			cnt = 100
		}
	}
}

class TextType {
	constructor(font, size, color = '#FFFFFF') {
		this._font = font
		this._size = size
		this._color = color
	}

	draw(x, y, content) {
		textFont(this._font)
		textSize(this._size)
		textAlign(CENTER, CENTER)
		fill(this._color)
		text(content, x, y)
	}
}

class Snowflake {
	constructor() {
		this._x = 0
		this._y = random(-50, 0)
		this._angle = random(0, 2 * PI)
		this._sz = random(2, 5)
		this._r = sqrt(random(pow(width / 2, 2)))
	}

	update(time) {
		let w = 0.6; // angular speed
		let angle = w * time + this._angle
		this._x = width / 2 + this._r * sin(angle)

		// different size snowflakes fall at slightly different y speeds
		this._y += pow(this._sz, 0.5)

		// delete snowflake if past end of screen
		if (this._y > height) {
			let index = snowflakes.indexOf(this)
			snowflakes.splice(index, 1)
			flag1 = true
		}
	}

	draw(t) {
		this.update(t)
		noStroke()
		ellipse(this._x, this._y, this._sz)
	}
}