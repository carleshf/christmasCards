package com.kuragari.wc202223.components;

import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.kuragari.wc202223.helpers.Box;
import com.kuragari.wc202223.helpers.CollisionDirection;

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

    public CollisionDirection checkCollision(BasicComponent other ) throws Exception {
        throw new Exception("Method not implemented");
    }

    public Box getBox( ) throws Exception {
        throw new Exception("Method not implemented");
    }
}
