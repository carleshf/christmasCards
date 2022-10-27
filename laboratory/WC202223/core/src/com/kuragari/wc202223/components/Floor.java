package com.kuragari.wc202223.components;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;

public class Floor extends BasicComponent {
    private Color _color;
    private float _w;
    private float _h;

    public Floor( float x, float y, float w, float h, String _c ) {
        super( x, y );
        this._w = w;
        this._h = h * -1;
        this._color = Color.valueOf( _c );
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
}
