package com.kuragari.wc202223.components;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.kuragari.wc202223.helpers.Box;

public class Character extends BasicComponent {

    private float _speed;
    private float _w = 28;
    private float _h = 38;

    public Character( float x, float y ) {
        super( x, y );
        this._speed = 5;
    }

    @Override
    public void draw( ShapeRenderer renderer ) throws Exception {
        renderer.setColor( Color.valueOf("#228855" ) );
        renderer.begin( ShapeRenderer.ShapeType.Filled );
        renderer.ellipse( this.x - ( this._w / 2 ), this.y - ( this._h / 2 ), this._w, this._h );
        renderer.end();
        renderer.begin( ShapeRenderer.ShapeType.Line );
        renderer.rect( this.x - ( this._w / 2 ), this.y - ( this._h / 2 ), this._w, this._h );
        renderer.end();
    }

    public Box getBox( ) throws Exception {
        return new Box(  this.x - ( this._w / 2 ), this.y - ( this._h / 2 ), this._w, this._h );
    }

    @Override
    public void update( String event ) {
        switch ( event ) {
            case "KeyUp":
                this.y += this._speed;
                break;
            case "KeyDown":
                this.y -= this._speed;
                break;
            case "KeyLeft":
                this.x -= this._speed;
                break;
            case "KeyRight":
                this.x += this._speed;
            default:
                break;
        }
    }
}
