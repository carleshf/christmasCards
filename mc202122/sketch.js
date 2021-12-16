let bit_font // Eight Bit Dragon (https://www.fontspace.com/eight-bit-dragon-font-f30428)
let chrm_font // Christmas Bell (https://www.dafont.com/christmas-bell.font)
function preload() {
  bit_font = loadFont('assets/EightBitDragon-anqx.ttf')
  chrm_font = loadFont('assets/Christmas Bell - Personal Use.otf')
}

const width = 800
const height = 600
const bkg = '#F5F5F5'
var global_flag = 'game'

var gamemap = map_from_str({
  'start': '1',
  'content': [
    { 'name': '1', 'w': 5, 'h': 5, 'cf': '#FF1166', 'cb': '#0044AA', 'walls': 'tblr', 
     'desc': [
        { 'typ': 'dr2', 'x': 4, 'y': 2 },
      ],
      'text': { 'flag': 1, 'msg': [ 'Welcome! Why don\'t you check the rest of the office?' ] } 
    },
    { 'name': '2', 'w': 6, 'h': 10, 'cf': '#FF1166', 'cb': '#0044AA', 'walls': 'tblr', 
     'desc': [
        { 'typ': 'dl1', 'x': 0, 'y': 2 },
        { 'typ': 'dl3', 'x': 0, 'y': 7 },
        { 'typ': 'dr4', 'x': 5, 'y': 2 },
      ] ,
     'text': { 'flag': 1, 'msg': [ 'Oh! The boss is here. Better talk to him!' ] } 
    },
    { 'name': '3', 'w': 5, 'h': 5, 'cf': '#FF1166', 'cb': '#0044AA', 'walls': 'tblr', 
      'desc': [
        { 'typ': 'dr2', 'x': 4, 'y': 2 },
        { 'typ': 'ps', 'x': 1, 'y': 2 },
      ],
      'text': { 'flag': -1, 'msg': undefined } 
    },
    { 'name': '4', 'w': 10, 'h': 5, 'cf': '#FF1166', 'cb': '#0044AA', 'walls': 'tblr', 
      'desc': [
        { 'typ': 'dl2', 'x': 0, 'y': 2 },
        { 'typ': 'dr5', 'x': 9, 'y': 2 },
        { 'typ': 'db6', 'x': 7, 'y': 4 },
      ],
      'text': { 'flag': -1, 'msg': undefined } 
    },
    { 'name': '5', 'w': 5, 'h': 5, 'cf': '#800000', 'cb': '#F5DEB3', 'walls': 'tbl', 
      'desc': [
        { 'typ': 'dl4', 'x': 0, 'y': 2 },
      ],
      'text': { 'flag': 2, 'msg': [ 'You can see the sea. This office has great views!' ] } 
    },
    { 'name': '6', 'w': 5, 'h': 5, 'cf': '#FF1166', 'cb': '#0044AA', 'walls': 'tblr', 
      'desc': [
        { 'typ': 'dt4', 'x': 2, 'y': 0 },
        { 'typ': 'dl7', 'x': 0, 'y': 2 },
        { 'typ': 'db8', 'x': 2, 'y': 4 },
        { 'typ': 'pv', 'x': 3, 'y': 3 },
      ],
      'text': { 'flag': -1, 'msg': undefined } 
    },
    { 'name': '7', 'w': 5, 'h': 5, 'cf': '#FF1166', 'cb': '#0044AA', 'walls': 'tblr', 
      'desc': [
        { 'typ': 'dr6', 'x': 4, 'y': 2 },
        { 'typ': 'pc', 'x': 1, 'y': 1 },
        { 'typ': 'pa', 'x': 1, 'y': 2 },
        { 'typ': 'py', 'x': 3, 'y': 3 },
      ],
      'text': { 'flag': -1, 'msg': undefined } 
    },
    { 'name': '8', 'w': 10, 'h': 5, 'cf': '#FF1166', 'cb': '#0044AA', 'walls': 'tblr', 
      'desc': [
        { 'typ': 'dt6', 'x': 7, 'y': 0 },
        { 'typ': 'dr9', 'x': 9, 'y': 2 },
        { 'typ': 'llAg', 'x': 0, 'y': 2 },
      ],
      'text': { 'flag': -1, 'msg': undefined } 
    },
    { 'name': '9', 'w': 5, 'h': 10, 'cf': '#800000', 'cb': '#F5DEB3', 'walls': 'tbl', 
      'desc': [
        { 'typ': 'dl8', 'x': 0, 'y': 7 },
      ],
      'text': { 'flag': 2, 'msg': [ 'This vew is amazing. People come out to relax watching the sea.' ] } 
    },
    { 'name': 'A', 'w': 10, 'h': 5, 'cf': '#FF1166', 'cb': '#0044AA', 'walls': 'tblr', 
      'desc': [
        { 'typ': 'dr8', 'x': 9, 'y': 2 },
        { 'typ': 'llBb', 'x': 0, 'y': 2 },
        { 'typ': 'ps', 'x': 3, 'y': 1 },
      ],
      'text': { 'flag': -1, 'msg': undefined } 
    },
    { 'name': 'B', 'w': 5, 'h': 11, 'cf': '#008000', 'cb': '#F5F5DC', 'walls': 'tbr', 
      'desc': [
        { 'typ': 'drA', 'x': 4, 'y': 8 },
        { 'typ': 'lbCr', 'x': 2, 'y': 10 },
        { 'typ': 'py', 'x': 1, 'y': 1 },
        { 'typ': 'pb', 'x': 3, 'y': 1 },
        { 'typ': 'pv', 'x': 1, 'y': 3 },
        { 'typ': 'ps', 'x': 3, 'y': 3 },
      ],
      'text': { 'flag': 2, 'msg': [ 'This vew of the mountains is fantastic! I never get tired of it!' ] } 
    },
     { 'name': 'C', 'w': 10, 'h': 5, 'cf': '#000080', 'cb': '#F5F5F5', 'walls': 'tblr', 
      'desc': [
        { 'typ': 'dtB', 'x': 2, 'y': 0 },
        { 'typ': 'drD', 'x': 9, 'y': 2 },
        { 'typ': 'py', 'x': 4, 'y': 3 },
        { 'typ': 'pt', 'x': 6, 'y': 3 },
      ],
      'text': { 'flag': -1, 'msg': undefined } 
    },
    { 'name': 'D', 'w': 5, 'h': 5, 'cf': '#000080', 'cb': '#F5F5F5', 'walls': 'tblr', 
     'desc': [
        { 'typ': 'dlC', 'x': 0, 'y': 2 },
        { 'typ': 'drE', 'x': 4, 'y': 2 },
        { 'typ': 'pv', 'x': 1, 'y': 1 },
        { 'typ': 'pb', 'x': 3, 'y': 3 },
      ],
      'text': { 'flag': -1, 'msg': undefined } 
    },
    { 'name': 'E', 'w': 5, 'h': 5, 'cf': '#000080', 'cb': '#F5F5F5', 'walls': 'tblr', 
     'desc': [
        { 'typ': 'dlD', 'x': 0, 'y': 2 },
        { 'typ': 'drF', 'x': 4, 'y': 2 },
        { 'typ': 'dbG', 'x': 2, 'y': 4 },
        { 'typ': 'pa', 'x': 2, 'y': 1 },
      ],
      'text': { 'flag': -1, 'msg': undefined } 
    },
    { 'name': 'F', 'w': 5, 'h': 5, 'cf': '#000080', 'cb': '#F5F5F5', 'walls': 'tbl', 
     'desc': [
        { 'typ': 'dlE', 'x': 0, 'y': 2 },
        { 'typ': 'ky', 'x': 3, 'y': 3 },
      ],
      'text': { 'flag': 1, 'msg': [ 'The sea... I really like the sea...' ] } 
    },
    { 'name': 'G', 'w': 5, 'h': 5, 'cf': '#000080', 'cb': '#F5F5F5', 'walls': 'tblr', 
     'desc': [
        { 'typ': 'dtE', 'x': 2, 'y': 0 },
        { 'typ': 'lrHy', 'x': 4, 'y': 2 },
      ],
      'text': { 'flag': -1, 'msg': undefined } 
    },
    { 'name': 'H', 'w': 5, 'h': 5, 'cf': '#000080', 'cb': '#F5F5F5', 'walls': 'tblr', 
     'desc': [
        { 'typ': 'dlG', 'x': 0, 'y': 2 },
        { 'typ': 'drI', 'x': 4, 'y': 2 },
        { 'typ': 'py', 'x': 2, 'y': 1 },
      ],
      'text': { 'flag': -1, 'msg': undefined } 
    },
    { 'name': 'I', 'w': 5, 'h': 5, 'cf': '#800000', 'cb': '#F5DEB3', 'walls': 'tbl', 
     'desc': [
        { 'typ': 'dlH', 'x': 0, 'y': 2 },
        { 'typ': 'pg', 'x': 2, 'y': 3 },
      ],
      'text': { 'flag': 1, 'msg': [ 'The sound of the weaves is amazing...' ] } 
    },
  ]
})


gamemap.addNpc( '2', new NpcBoss( 3, 2 ) )
gamemap.addNpc( '4', new NpcMaria( 3, 3 ) )
gamemap.addNpc( '9', new NpcAngel( 4, 4 ) )
gamemap.addNpc( 'B', new NpcJoy( 2, 2 ) )
gamemap.addNpc( 'D', new NpcYule( 2, 3 ) )


function setup() {
  createCanvas( width, height )
  background( bkg )
}

function draw() {
  if( global_stage == 'starring' ) starring()
  if( global_stage == 'game' ) gamemap.draw()
  if( global_stage == 'ending' ) ending()
}

function keyPressed() {
  if( global_stage == 'starring' || global_stage == 'ending' )_starend_key = keyCode
  if( global_stage == 'game' ) gamemap.movePlayer( keyCode )
  
  return false
}