package entities;

class AIPlayer extends Player {
    var moveTimer:Float = 0;
    var moveDirectionX:Int = 0;
    var moveDirectionY:Int = 0;

    public function new(nameEmoji:String) {
        super(nameEmoji);
    }

    override public function update(delta:Float):Void {
        moveTimer -= delta;
        if (moveTimer <= 0) {
            pickNewDirection();
            moveTimer = 1 + Math.random(); // Move in new direction for 1–2 seconds
            if (Math.random() < 0.3) {
                shoot();
            }
        }
        move(moveDirectionX, moveDirectionY);
    }

    function pickNewDirection():Void {
        moveDirectionX = Std.int(Math.floor(Math.random() * 3) - 1); // -1, 0 or 1
        moveDirectionY = Std.int(Math.floor(Math.random() * 3) - 1);
    }

    function shoot():Void {
        trace(nameEmoji + " (AI) shoots a snowball! ❄️");
        // TODO: spawn a snowball entity and handle shooting logic
    }
}
