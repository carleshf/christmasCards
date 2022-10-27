package com.kuragari.wc202223.components;

import com.badlogic.gdx.graphics.glutils.ShapeRenderer;

public abstract class BasicComponent {
    public float x;
    public float y;

    public BasicComponent( float x, float y ) {
        this.x = x;
        this.y = y;
    }

    public void draw( ShapeRenderer renderer ) throws Exception {
        throw new Exception("Method not implemented");
    }

    public void update( String event ) throws Exception {
        throw new Exception("Method not implemented");
    }
}
