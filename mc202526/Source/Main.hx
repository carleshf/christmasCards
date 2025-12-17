package;

import openfl.display.Sprite;
import openfl.events.Event;


import openfl.events.MouseEvent;

class Main extends Sprite {

	var _grid:GameLayout;
    var _flag:Bool;

	public function new() {
		super();

        _flag = false;

		_grid = new GameLayout(1, 32);
		addChild(_grid);

        addEventListener(Event.ENTER_FRAME, update);
        addEventListener(MouseEvent.CLICK, click4);
	}

    function click4(e:MouseEvent):Void {
        _flag = true;
    }

	function update(e:Event):Void {
        //if (_flag) {
        //    _flag = false;
            _grid.update();
        //}
	}
}
