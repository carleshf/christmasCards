package;

import openfl.display.Sprite;

private var _layouts:Array<Array<Array<Int>>> = [
    // 0: Simple 3x3 grid
    [
        [0, 1, 2],
        [7, 8, 3],
        [6, 5, 4]
    ],
    // 1: Checkerboard 4x4 grid
    [
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1]
    ],
];

class ColorGrid extends Sprite {

    private var _layout:Array<Array<PixelBlock>>;
    public var _hasShot:Array<Array<Bool>>;
    public var cols:Int;
	public var rows:Int;
	private var _size:Int;
    
    public function new (n:Int, size:Int) {
        super();

        _size = size;
        _layout = new Array<Array<PixelBlock>>();
        _hasShot = new Array<Array<Bool>>();
        for (ii in 0..._layouts[n].length) {
            _layout[ii] = new Array<PixelBlock>();
            _hasShot[ii] = new Array<Bool>();
            for (jj in 0..._layouts[n][ii].length) {
                _layout[ii][jj] = new PixelBlock(_size, _layouts[n][ii][jj]);
                _hasShot[ii][jj] = false;
            }
        }

		cols = _layouts[n][0].length;
		rows = _layouts[n].length;
    }

    public function drawGrid():Void {
		for (ii in 0...cols) {
			for (jj in 0...rows) {
				_layout[ii][jj].x = ii * _size;
                _layout[ii][jj].y = jj * _size;
                addChild(_layout[ii][jj]);
			}
		}
	}

    public function addShot(col:Int, row:Int):Void {
        if (col >= 0 && col < cols && row >= 0 && row < rows) {
            if (!_hasShot[col][row]) {
                _hasShot[col][row] = true;
            }
        }
    }

    public function hasShot(col:Int, row:Int):Bool {
        if (col >= 0 && col < cols && row >= 0 && row < rows) {
            return _hasShot[col][row];
        }
        return true;
    }

    public function update(balls:Array<PixelBall>, onBallHit:PixelBall->Void):Void {
        for (ii in 0...balls.length) {
            if (balls[ii] == null) continue;

            var ball:PixelBall = balls[ii];
            var col:Int = Std.int(ball.x / _size) - 2;
            var row:Int = Std.int(ball.y / _size) - 2;

            if (col >= 0 && col < cols && row >= 0 && row < rows) {
                if (_layout[col][row] != null && _layout[col][row].getColor() == ball.getColor()) {
                    onBallHit(ball);
                    removeChild(_layout[col][row]);
                    _layout[col][row] = null;
                    _hasShot[col][row] = false;
                }
            }
        }
    }

    public function getColor(col:Int, row:Int):Array<Int> {
        if (row < 0 && col >= 0 && col < cols) {
            // check all columns on the top row
            for (ii in 0...rows) {
                if (_layout[col][ii] != null) {
                    //trace("A: ", _layout[col][ii]);
                    return [_layout[col][ii].getColor(), col, ii];
                }
            }
        }
        
        if (row >= rows && col >= 0 && col < cols) {
            // check all columns on the bottom row
            for (ii in 0...rows) {
                var iip:Int = rows - 1 - ii;
                if (_layout[col][iip] != null) {
                    //trace("B: ", _layout[col][iip]);
                    return [_layout[col][iip].getColor(), col, iip];
                }
            }
        }

        if (col < 0 && row >= 0 && row < rows) {
            // check all rows on the left column
            for (jj in 0...cols) {
                if (_layout[jj][row] != null) {
                    //trace("C: ", _layout[jj][row]);
                    return [_layout[jj][row].getColor(), jj, row];
                }
            }
        } 
        
        if (col >= cols && row >= 0 && row < rows) {
            // check all rows on the right column
            for (jj in 0...cols) {
                var jjp:Int =  cols - 1 - jj;
                if (_layout[jjp][row] != null) {
                    //trace("D: ", _layout[jjp][row]);
                    return [_layout[jjp][row].getColor(), jjp, row];
                }
            }
        }

        return [-1, -1, -1];
    }
}