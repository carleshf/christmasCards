package com.kuragari.wc202223.components;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;

public class Character extends BasicComponent {

    private float _speed;

    public Character( float x, float y ) {
        super( x, y );
        this._speed = 5;
    }

    @Override
    public void draw( ShapeRenderer renderer ) throws Exception {
        renderer.setColor( Color.valueOf("#228855" ) );
        renderer.begin( ShapeRenderer.ShapeType.Filled );
        renderer.ellipse( this.x - 8, this.y - 12, 16, 24 );
        renderer.end();
    }

    @Override
    public void update( String event ) {
        switch ( event ) {
            case "key-up":
                this.y += this._speed;
                break;
            case "key-down":
                this.y -= this._speed;
                break;
            case "key-left":
                this.x -= this._speed;
                break;
            case "key-right":
                this.x += this._speed;
            default:
                break;
        }
    }
}
