package;

import openfl.display.Sprite;
import openfl.events.MouseEvent;

private var _saves:Array<Array<Array<Array<Int>>>> = [
    // 0: Simple 3x3 grid
    [
        [ [0, 1], [2, 1], [1, 1] ],
        [ [7, 1], [8, 1], [3, 1] ],
        [ [4, 1], [6, 1], [5, 1] ]
    ],
    // 1: Checkerboard 4x4 grid
    [
        [ [1, 4], [0, 4] ],
        [ [0, 1], [1, 1] ],
        [ [1, 1], [0, 1] ],
        [ [0, 4], [1, 4] ]
    ],
];

private var _usedEmoji:String = "⬜";

class Bench extends Sprite {

    private var _size:Int;
    private var _bench:Array<ColorShooter>;

    public function new(size:Int, bench:Array<Array<Int>>)  {
        super();

        _size = size;
        _bench = new Array<ColorShooter>();
        for (ii in 0...bench.length) {
            _bench[ii] = new ColorShooter(bench[ii][0], bench[ii][1], size);
        }
    }

    public function click(ii:Int, _callback:ColorShooter->Void):Void {
        if (_bench.length > 0) {
            _callback(_bench[0]);
            _bench = _bench.slice(1, _bench.length);
            drawBench();
        }
    }

    public function drawBench():Void {
        for (ii in 0..._bench.length) {
            _bench[ii].x = 0;
            _bench[ii].y = ii * _size * 5/2;
            addChild(_bench[ii]);
        }
    }
}

class FreeSlot extends Sprite {

    private var _background:PixelBlock;
    private var _shooter:ColorShooter;

    public function new(size:Int) {
        super();

        _background = new PixelBlock(size, 8);
        addChild(_background);
        _shooter = null;
    }

    public function click(ii:Int, _callback:ColorShooter->Void):Void {
        if (_shooter != null) {
            var shooter = _shooter;
            removeChild(_shooter);
            _shooter = null;
            _callback(shooter);
        }
    }

    public function isFree():Bool {
        return _shooter == null;
    }

    public function addShooter(shooter:ColorShooter):Void {
        if (_shooter == null) {
            _shooter = shooter;
            _shooter.x = 0;
            _shooter.y = 0;
            addChild(_shooter);
        }
    }
}

class BlockBench extends Sprite {

    private var _bench:Array<Bench>;
    private var _free:Array<FreeSlot>;
    private var _size:Int;
    private var _callbackFree:ColorShooter -> Void;
    private var _callbackBench:ColorShooter -> Void;

    public function new (n:Int, size:Int, free:Int) {
        super();

        _size = size;
        _free = new Array<FreeSlot>();
        for (ii in 0...free) {
            _free[ii] = new FreeSlot(size);
        }
        _bench = new Array<Bench>();
        for (ii in 0..._saves[n].length) {
            _bench[ii] = new Bench(size, _saves[n][ii]);
        }
    }

    public function setCallbackBench(callback:ColorShooter -> Void):Void {
        _callbackBench = callback;
    }

    public function setCallbackFree(callback:ColorShooter -> Void):Void {
        _callbackFree = callback;
    }

    public function drawBench():Void {
        for (ii in 0..._free.length) {
            _free[ii].addEventListener(MouseEvent.CLICK, function(e:MouseEvent) {
                _free[ii].click(ii, _callbackFree); 
            });
            _free[ii].x = ii * _size * 2;
            _free[ii].y = 0;
            addChild(_free[ii]);
        }

        for (ii in 0..._bench.length) {
            _bench[ii].addEventListener(MouseEvent.CLICK, function(e:MouseEvent) {
                _bench[ii].click(ii, _callbackBench);
            });
            _bench[ii].x = ii * _size * 2;
            _bench[ii].y = _size * 5/2;
            addChild(_bench[ii]);
            _bench[ii].drawBench();
        }
    }

    public function addToFreeSlot(shooter:ColorShooter):Bool {
        for (ii in 0..._free.length) {
            if (_free[ii].isFree()) {
                shooter.setDirection(0);
                _free[ii].addShooter(shooter);
                return true;
            }
        }
        return false;
    }
}