package;

import openfl.display.Sprite;
import openfl.text.TextField;
import openfl.text.TextFormat;


private var _emojis:Array<String> = [
    "🔴", /*  0 */ "🟠", /*  1 */ "🟡", /* 2 */ "🟢", /* 3 */ "🔵", /* 4 */
    "🟣", /*  5 */ "🟤", /*  6 */ "⚫", /* 7 */ "⚪", /* 8 */
];

class PixelBall extends Sprite {

    private var _color:Int;
    private var _direction:Int;
    
    public function new(size:Int, direction:Int, color:Int) {
        super();

        _color = color;
        _direction = direction;

        var textformat:TextFormat = new TextFormat();
        textformat.size = size;
        textformat.font = "Arial";

        var textfield:TextField = new TextField();
        textfield.defaultTextFormat = textformat;

        textfield.text = _emojis[_color];
        textfield.x = 0;
        textfield.y = 0;
        addChild(textfield);
    }

    override public function toString():String {
        return "PixelBall(color: " + _color + " : " + _emojis[_color] + ")";
    }

    public function getDirection():Int {
        return _direction;
    }

    public function setPosition(x:Float, y:Float):Void {
        this.x = x;
        this.y = y;
    }

    public function getColor():Int {
        return _color;
    }

    public function update(speed:Float):Array<Float> {
        if(_direction == 0) {
            this.x += speed;
        } else if(_direction == 1) {
            this.y -= speed;
        } else if(_direction == 2) {
            this.x -= speed;
        } else if(_direction == 3) {
            this.y += speed;
        }

        return [this.x, this.y];
    }
}
