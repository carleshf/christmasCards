package map;

import openfl.display.Sprite;
import openfl.text.TextField;
import openfl.text.TextFormat;

class Obstacle extends Sprite {
    public function new() {
        super();
        var type = Math.random();
        var emoji = (type < 0.5) ? "🎄" : "🪨";

        var label = new TextField();
        label.defaultTextFormat = new TextFormat("_sans", 30, 0x000000);
        label.text = emoji;
        label.width = 40;
        label.height = 40;
        label.selectable = false;
        label.x = -label.width / 2;
        label.y = -label.height / 2;
        addChild(label);
    }
}
