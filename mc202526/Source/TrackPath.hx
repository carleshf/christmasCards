package;

import js.html.AbortController;
import openfl.display.Sprite;
import openfl.text.TextField;
import openfl.text.TextFormat;


private var _pathEmoji:String = "⬛"; //"🧱";
private var _startEmoji:String = "➡️";

private class ShooterAndCallback {
    public var shooter:ColorShooter;
    public var callback:ColorShooter -> Void;

    public function new(shooter:ColorShooter, callback:ColorShooter -> Void) {
        this.shooter = shooter;
        this.callback = callback;
    }
}

class TrackPath extends Sprite {
    
    private var _cols:Int;
    private var _rows:Int;
    private var _size:Int;
    private var _shooters:Array<ShooterAndCallback>;
    private var _balls:Array<PixelBall>;

    public function new (cols:Int, rows:Int, size:Int) {
        super();

        _cols = cols;
        _rows = rows;
        _size = size;

        _shooters = new Array<ShooterAndCallback>();
        _balls = new Array<PixelBall>();
    }

    public function addShooter(shooter:ColorShooter, callbak:ColorShooter -> Void):Void {
        shooter.x = 0;
        shooter.y = (_rows + 3) *_size;
        shooter.setDirection(0);
        _shooters.push(new ShooterAndCallback(shooter, callbak));
        addChild(shooter);
    }

    public function addBall(ball:PixelBall, shooterPos:Array<Int>):Void {
        shooterPos[0] += 2;
        shooterPos[1] += 2;

        if (ball.getDirection() == 0) {
            shooterPos[0] += 1;
        } else if (ball.getDirection() == 1) {
            shooterPos[1] -= 1;
        } else if (ball.getDirection() == 2) {
            shooterPos[0] -= 1;
        } else if (ball.getDirection() == 3) {
            shooterPos[1] += 1;
        }

        ball.setPosition(shooterPos[0] * _size, shooterPos[1] * _size);
        _balls.push(ball);
        addChild(ball);
    }

    public function drawPath():Void {
        var textformat = new TextFormat();
        textformat.size = _size;
        textformat.font = "Arial";

        for (ii in 0..._cols + 4) {
            for (jj in 0..._rows + 4) {
                if (ii == 0 || jj == 0 || ii == _cols + 3 || jj == _rows + 3) {
                    var textfield = new TextField();
                    textfield.defaultTextFormat = textformat;

                    if (ii == 0 && jj == _rows + 3) {
                        textfield.text = _startEmoji;
                    } else {
                        textfield.text = _pathEmoji;
                    }
                    
                    textfield.x = ii * _size;
                    textfield.y = jj * _size;
                    addChild(textfield);
                }
            }
        }
    }

    private function updateShooters():Void {
        var toRemove:Int = -1;
        for (ii in 0..._shooters.length) {
            var pos:Array<Float> = _shooters[ii].shooter.update(2);

            if (_shooters[ii].shooter.getDirection() == 0 && pos[0] > (_cols + 3) * _size) {
                _shooters[ii].shooter.x = (_cols + 3) * _size;
                _shooters[ii].shooter.setDirection(1);
            }

            if (_shooters[ii].shooter.getDirection() == 1 && pos[1] < 0) {
                _shooters[ii].shooter.y = 0;
                _shooters[ii].shooter.setDirection(2);
            }
            
            if (_shooters[ii].shooter.getDirection() == 2 && pos[0] < 0) {
                _shooters[ii].shooter.x = 0;
                _shooters[ii].shooter.setDirection(3);
            }
            
            if (_shooters[ii].shooter.getDirection() == 3 && pos[1] > (_rows + 2) * _size) {
                toRemove = ii;
            }
        }

        if (toRemove != -1) {
            var shooterAndCallback:ShooterAndCallback = _shooters[toRemove];
            removeChild(shooterAndCallback.shooter);
            _shooters.splice(toRemove, 1);
            shooterAndCallback.callback(shooterAndCallback.shooter);
        }
    }

    public function update():Void{
        updateShooters();
        for (ii in 0..._balls.length) {
            _balls[ii].update(2);
        }
    }

    public function getShooters():Array<ColorShooter> {
        var shooters:Array<ColorShooter> = new Array<ColorShooter>();
        for (ii in 0..._shooters.length) {
            shooters.push(_shooters[ii].shooter);
        }
        return shooters;
    }

    public function getBalls():Array<PixelBall> {
        return _balls;
    }

    public function onBallHit(ball:PixelBall):Void {
        var index:Int = _balls.indexOf(ball);
        if (index != -1) {
            removeChild(ball);
            _balls.splice(index, 1);
        }
    }

    public function removeShooter(shooter:ColorShooter):Void {
        var index:Int = -1;
        for (ii in 0..._shooters.length) {
            if (_shooters[ii].shooter == shooter) {
                index = ii;
                break;
            }
        }
        if (index != -1) {
            removeChild(_shooters[index].shooter);
            _shooters.splice(index, 1);
        }
    }
}