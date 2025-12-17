package;

import openfl.display.Sprite;
import openfl.text.TextField;
import openfl.text.TextFormat;

private var _emojis:Array<String> = [
    "🟥", /*  0 */ "🟧", /*  1 */ "🟨", /* 2 */ "🟩", /* 3 */ "🟦", /* 4 */
    "🟪", /*  5 */ "🟫", /*  6 */ "⬛", /* 7 */ "⬜", /* 8 */
];

class PixelBlock extends Sprite {

    private var _color:Int;
    
    public function new(size:Int, color:Int) {
        super();

        _color = color;

        var textformat = new TextFormat();
        textformat.size = size;
        textformat.font = "Arial";

        var textfield = new TextField();
        textfield.defaultTextFormat = textformat;

        textfield.text = _emojis[color];
        textfield.x = 0;
        textfield.y = 0;
        addChild(textfield);
    }

    override public function toString():String {
        return "PixelBlock(color: " + _color + " : " + _emojis[_color] + ")";
    }

    public function getColor():Int {
        return _color;
    }
}
