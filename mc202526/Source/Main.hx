package;

import openfl.display.Sprite;
import scenes.BattleScene;

class Main extends Sprite {
    public function new() {
        super();
        var battle = new BattleScene();
        addChild(battle);
    }
}
