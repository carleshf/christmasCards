package com.kuragari.wc202223.components;

import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.kuragari.wc202223.helpers.Collision;
import com.kuragari.wc202223.helpers.CollisionDirection;
import com.sun.org.apache.xpath.internal.operations.Bool;

import java.util.HashMap;
import java.util.Map;

public class ComponentManager {

    private Character _main;
    private Map <String, BasicComponent> _floors;
    private int _cnt;

    public ComponentManager() {
        this._floors = new HashMap<String, BasicComponent>();
        this._cnt = 0;
    }

    public void setMainCharacter( Character main ) {
        this._main = main;
    }

    public void addFloor( Floor new_floor ) {
        this._floors.put( "ef" + Integer.toString( this._cnt ), new_floor );
        this._cnt += 1;
    }

    public void updateElements( String event, Collision impact ) throws Exception {
        this._main.update( event );
        /*for( Map.Entry<String, BasicComponent> entry : this._game_elements.entrySet() ) {
            entry.getValue().update( event );
        }*/
    }

    public void drawElements( ShapeRenderer renderer ) throws Exception {
        for( Map.Entry<String, BasicComponent> entry : this._floors.entrySet() ) {
            entry.getValue().draw( renderer );
        }
        this._main.draw( renderer );
    }

    public Collision checkCollision() throws Exception {
        Boolean collision_floor = false;
        for( Map.Entry<String, BasicComponent> entry : this._floors.entrySet() ) {
            CollisionDirection impact = entry.getValue().checkCollision( this._main );
            if( impact != CollisionDirection.None ) {
                return new Collision( entry.getKey(), impact );
            }
        }
        return new Collision( "", CollisionDirection.None );
    }
}
