package map;

import openfl.display.Sprite;


class BattleMap extends Sprite {
    private var mapWidth:Int;
    private var mapHeight:Int;
    private var obstacles:Array<Obstacle>;

    public function new() {
        super();
        //drawBackground();
        //spawnObstacles();
    }

    function drawBackground():Void {
        /*graphics.beginFill(0xCCFFFF); // Light blue snowy background
        graphics.drawRect(0, 0, 640, 480);
        graphics.endFill();*/
    }

    function spawnObstacles():Void {
        /*for (i in 0...5) {
            var obstacle = new Obstacle();
            obstacle.x = Math.random() * 600 + 20;
            obstacle.y = Math.random() * 400 + 20;
            addChild(obstacle);
        }*/
    }
}