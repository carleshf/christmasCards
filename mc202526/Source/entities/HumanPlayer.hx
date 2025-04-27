package entities;

import openfl.events.KeyboardEvent;
import openfl.events.Event;
import openfl.ui.Keyboard;

class HumanPlayer extends Player {
    public var upPressed:Bool = false;
    public var downPressed:Bool = false;
    public var leftPressed:Bool = false;
    public var rightPressed:Bool = false;

    public function new(nameEmoji:String) {
        super(nameEmoji);
        addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
    }

    function onAddedToStage(e:Event):Void {
        removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
        stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
        stage.addEventListener(KeyboardEvent.KEY_UP, onKeyUp);
    }

    function onKeyDown(e:KeyboardEvent):Void {
        switch (e.keyCode) {
            case Keyboard.UP: upPressed = true;
            case Keyboard.DOWN: downPressed = true;
            case Keyboard.LEFT: leftPressed = true;
            case Keyboard.RIGHT: rightPressed = true;
            case Keyboard.SPACE: shoot();
        }
    }

    function onKeyUp(e:KeyboardEvent):Void {
        switch (e.keyCode) {
            case Keyboard.UP: upPressed = false;
            case Keyboard.DOWN: downPressed = false;
            case Keyboard.LEFT: leftPressed = false;
            case Keyboard.RIGHT: rightPressed = false;
        }
    }

    override public function update(delta:Float):Void {
        var dx = 0;
        var dy = 0;
        if (leftPressed) dx -= 1;
        if (rightPressed) dx += 1;
        if (upPressed) dy -= 1;
        if (downPressed) dy += 1;
        move(dx, dy);
    }

    function shoot():Void {
        trace(nameEmoji + " shoots a snowball! ❄️");
    }
}
