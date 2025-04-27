package entities;

import openfl.display.Sprite;
import openfl.text.TextField;
import openfl.text.TextFormat;

class Player extends Sprite {
    public var nameEmoji:String;
    public var health:Int = 100;
    public var speed:Float = 3;
    public var isAlive:Bool = true;

    var label:TextField;

    public function new(nameEmoji:String) {
        super();
        this.nameEmoji = nameEmoji;
        createLabel();
    }

    function createLabel():Void {
        label = new TextField();
        label.defaultTextFormat = new TextFormat("_sans", 40, 0x000000);
        label.text = nameEmoji;
        label.width = 50;
        label.height = 50;
        label.selectable = false;
        label.x = -label.width / 2;
        label.y = -label.height / 2;
        addChild(label);
    }

    public function move(dx:Float, dy:Float):Void {
        this.x += dx * speed;
        this.y += dy * speed;
    }

    public function takeDamage(amount:Int):Void {
        health -= amount;
        if (health <= 0) {
            health = 0;
            isAlive = false;
            onDeath();
        }
    }

    function onDeath():Void {
        // Placeholder: you can override or extend this later
        this.visible = false;
    }

    public function update(delta:Float):Void {
        // Placeholder: overridden by subclasses
    }
}
