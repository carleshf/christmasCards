package;

import openfl.display.Sprite;
import openfl.text.TextField;
import openfl.text.TextFormat;


private var _emojis:Array<String> = [
    "🎅🏻", /*  0 */ "🎁", /*  1 */ "⭐", /* 2 */ "🎄", /* 3 */ "🧝‍♂️", /* 4 */
    "💟", /*  5 */ "🦌", /*  6 */ "🐈‍⬛", /* 7 */ "⛄", /* 8 */
];

class ColorShooter extends Sprite {

    private var _size:Int;
    private var _color:Int;
    private var _shots:Int;
    private var _shotsText:TextField;
    private var _direction:Int;

    public function new(color:Int, shots:Int, size:Int) {
        super();

        _color = color;
        _shots = shots;
        _size = size;
        _direction =  0;

        var textformatEmoji = new TextFormat();
        textformatEmoji.size = _size;
        textformatEmoji.font = "Arial";

        var textformatShots = new TextFormat();
        textformatShots.size = Std.int(_size / 2);
        textformatShots.font = "Arial";

        var textfield = new TextField();
        textfield.defaultTextFormat = textformatEmoji;

        _shotsText = new TextField();
        _shotsText.defaultTextFormat = textformatShots;

        textfield.text = _emojis[_color];
        textfield.x = 0;
        textfield.y = 0;

        _shotsText.text = Std.string(_shots);
        _shotsText.x = _size / 2;
        _shotsText.y = - _size * 2/3;

        addChild(textfield);
        addChild(_shotsText);
    }

    public function shoot():Bool {
        if (_shots > 0) {
            _shots--;
            _shotsText.text = Std.string(_shots);
        } 
        return _shots > 0;
    }

    public function update(speed:Float):Array<Float> {
        if(_direction == 0) {           // right
            this.x += speed;
        } else if(_direction == 1) {    // up
            this.y -= speed;
        } else if(_direction == 2) {    // left
            this.x -= speed;
        } else if(_direction == 3) {    // down
            this.y += speed;
        }

        orientShotsLabel();

        return [this.x, this.y];
    }

    override public function toString():String {
        return "ColorShooter(color: " + _color + " : " + _emojis[_color] + ", shots: " + _shots + ")";
    }

    public function getColor():Int {
        return _color;
    }

    public function getPosition():Array<Float> {
        return [this.x, this.y];
    }

    public function getDirection():Int {
        return _direction;
    }

    public function setDirection(direction:Int):Void {
        _direction = direction;
        orientShotsLabel();
    }

    private function orientShotsLabel():Void {
        if(_direction == 0) {           // right
            _shotsText.x = _size / 2;
            _shotsText.y = - _size * 2/3;
        } else if(_direction == 1) {    // up
            _shotsText.x = - _size * 2/3;
            _shotsText.y = _size / 2;
        } else if(_direction == 2) {    // left
            _shotsText.x = _size / 2;
            _shotsText.y = - _size * 2/3;
        } else if(_direction == 3) {    // down
            _shotsText.x = - _size * 2/3;
            _shotsText.y = _size / 2;
        }
    }
}