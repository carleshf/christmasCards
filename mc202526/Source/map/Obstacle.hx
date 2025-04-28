package map;

import openfl.display.Sprite;
import openfl.text.TextField;
import openfl.text.TextFormat;

class Obstacle extends Sprite {
    private var emoji:String;
    private var sz:Int;
    private var drawBox:Bool;
    private var txtField:TextField;

    public function new(type:String, sz:Int, x:Float, y:Float, box:Bool) {
        super();
        switch (type) {
            case "t":
                this.emoji = "🎄";
            case "r":
                this.emoji = "🪨";
            case "i":
                this.emoji = "🧊";
            case "w":
                this.emoji = "🏂";
            case "k":
                this.emoji = "⛷️";
            case "s":
                this.emoji = "🛷";
            case "p":
                this.emoji = "🥌";
            case "a":
                this.emoji = "🌲";
            case "b":
                this.emoji = "🏡";
            case "h":
                this.emoji = "🏠";
            case "1":
                this.emoji = "🟦";
            case "2":
                this.emoji = "🟫";
            case "3":
                this.emoji = "⬛";
            case "4":
                this.emoji = "⬜";
            default:
                this.emoji = "🟥";
        }
        this.sz = sz;
        this.txtField = new TextField();
        this.txtField.defaultTextFormat = new TextFormat("_sans", 30, 0x000000);
        this.txtField.text = emoji;
        this.txtField.width = this.sz;
        this.txtField.height = this.sz;
        this.txtField.selectable = false;
        this.txtField.x = -this.txtField.width / 2;
        this.txtField.y = -this.txtField.height / 2;

        addChild(this.txtField);

        this.x = x;
        this.y = y;

        "☃️⛄";
        "🎁🍫";
    }
}
