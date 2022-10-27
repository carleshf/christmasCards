package com.kuragari.wc202223.components;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.kuragari.wc202223.helpers.Box;
import com.kuragari.wc202223.helpers.CollisionBlocked;
import com.kuragari.wc202223.helpers.CollisionDirection;


public class Floor extends BasicComponent {
    private Color _color;
    private float _w;
    private float _h;

    private CollisionBlocked _collision;

    public Floor(float x, float y, float w, float h, String color ) {
        super( x, y );
        this._w = w;
        this._h = h;
        this._color = Color.valueOf( color );
        this._collision = CollisionBlocked.TopToDown;
    }

    public Floor(float x, float y, float w, float h, String color, CollisionBlocked collision ) {
        super( x, y );
        this._w = w;
        this._h = h;
        this._color = Color.valueOf( color );
        this._collision = collision;
    }

    @Override
    public void draw( ShapeRenderer renderer ) {
        renderer.setColor( this._color );
        renderer.begin( ShapeRenderer.ShapeType.Filled );
        renderer.rect( this.x, this.y, this._w, this._h );
        renderer.end();
    }

    @Override
    public void update( String event ) { }

    public Box getBox( ) throws Exception {
        return new Box( this.x, this.y, this._w, this._h );
    }

    public CollisionDirection checkCollision( BasicComponent other ) throws Exception {
        Box other_box = other.getBox();

        if( this._collision == CollisionBlocked.LeftToRight
                || this._collision == CollisionBlocked.AllHorizontal
                || this._collision == CollisionBlocked.AllHorizontalAndVertical
                || other_box.x + other_box.w >= this.x ) {
            return CollisionDirection.FromLeft;
        }

        if( this._collision == CollisionBlocked.RightToLeft
                || this._collision == CollisionBlocked.AllHorizontal
                || this._collision == CollisionBlocked.AllHorizontalAndVertical
                || other_box.x <= this.x + this._w ) {
            return CollisionDirection.FromRight;
        }


        //return other_box.x + other_box.w >= this.x && other_box.x <= this.x + this._w;
            /*this.x >= other_box.x
            && this.x + this._w <= other_box.x + other_box.w
            && this.y >= other.y
            && this.y + this._h <= other.y + other_box.h;*/

        return CollisionDirection.None;
    }
}
