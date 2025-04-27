package scenes;

import openfl.display.Sprite;
import openfl.events.Event;
import entities.HumanPlayer;
import entities.AIPlayer;
import map.BattleMap;
import map.Obstacle;

class BattleScene extends Sprite {
    var player1:HumanPlayer;
    var player2:AIPlayer;
    var battleMap:BattleMap;

    public function new() {
        super();

        // Set up the map
        battleMap = new BattleMap();
        addChild(battleMap);

        // Set up players
        player1 = new HumanPlayer("🟥"); // Red square emoji
        player2 = new AIPlayer("🟦");    // Blue square emoji

        addChild(player1);
        addChild(player2);

        // TODO: maybe this should be in the map class?
        // Place them at starting positions
        player1.x = 100;
        player1.y = 200;

        player2.x = 500;
        player2.y = 200;

        // Listen for ENTER_FRAME to update the game each frame
        addEventListener(Event.ENTER_FRAME, onEnterFrame);
    }

    function onEnterFrame(event:Event):Void {
        var delta:Float = 1 / 60; // We'll assume 60fps for now

        player1.update(delta);
        player2.update(delta);

        // TODO: update snowballs, check collisions, etc
    }
}
