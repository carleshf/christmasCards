package;

import openfl.display.Sprite;

private var _origPos:Array<Int> = [0, 0];
private var _shooterVsBallDirection:Array<Int> = [
    1, // if shotter 0 (right), ball goes 1 (up)
    2, // if shotter 1 (up),    ball goes 2 (left)
    3, // if shotter 2 (left),  ball goes 3 (down)
    0  // if shotter 3 (down),  ball goes 0 (right)
];

class GameLayout extends Sprite {

    private var _trackPath:TrackPath;
    private var _blockBench:BlockBench;
    private var _colorGrid:ColorGrid;
    private var _size:Int;
    private var _pathSize:Int = 12;

    public function new (n:Int, size:Int) {
        super();

        _size = size;
        _colorGrid = new ColorGrid(n, size);
        _blockBench = new BlockBench(n, size, 5);
        _trackPath = new TrackPath(_pathSize, _pathSize, size);

        _blockBench.setCallbackBench(function(shooter:ColorShooter):Void {
            _trackPath.addShooter(shooter, function(shooter:ColorShooter):Void {
                _blockBench.addToFreeSlot(shooter);
            });
        });

        _blockBench.setCallbackFree(function(shooter:ColorShooter):Void {
            _trackPath.addShooter(shooter, function(shooter:ColorShooter):Void {
                _blockBench.addToFreeSlot(shooter);
            });
        });

        _trackPath.x = _origPos[0];
        _trackPath.y = _origPos[1];
        _trackPath.drawPath();

        _blockBench.x = _origPos[0];
        _blockBench.y = _origPos[1] + (_pathSize + 5) * _size;
        _blockBench.drawBench();

        _colorGrid.x = _origPos[0] + 2 * _size;
        _colorGrid.y = _origPos[1] + 2 * _size;
        _colorGrid.drawGrid();

        addChild(_trackPath);
        addChild(_blockBench);
        addChild(_colorGrid);
    }

    public function update():Void {
        var _shootersToRemove:Array<ColorShooter> = [];
        _trackPath.update();
        for (shooter in _trackPath.getShooters()) {
            var shooterPos = shooter.getPosition();
            shooterPos[0] += _trackPath.x;
            shooterPos[1] += _trackPath.y;
            var shooerCell:Array<Int> = [
                Std.int((shooterPos[0] - _colorGrid.x) / _size),
                Std.int((shooterPos[1] - _colorGrid.y) / _size)
            ];
            var colorData:Array<Int> = _colorGrid.getColor(shooerCell[0], shooerCell[1]);
            if (colorData[0] == shooter.getColor()) {
                if (!_colorGrid.hasShot(colorData[1], colorData[2])) {
                    var ball:PixelBall= new PixelBall(_size, _shooterVsBallDirection[shooter.getDirection()], shooter.getColor());
                    _trackPath.addBall(ball, shooerCell);
                    _colorGrid.addShot(colorData[1], colorData[2]);
                    if (!shooter.shoot()) {
                        _shootersToRemove.push(shooter);
                    }
                }
            }
        }
        _colorGrid.update(_trackPath.getBalls(), _trackPath.onBallHit);
        for (shooter in _shootersToRemove) {
            _trackPath.removeShooter(shooter);
        }
    } 
}