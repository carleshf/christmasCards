package com.kuragari.wc202223.components;

import com.badlogic.gdx.graphics.glutils.ShapeRenderer;

import java.util.HashMap;
import java.util.Map;

public class ComponentManager {

    private Map <String, BasicComponent> _game_elements;
    private int _cnt;

    public ComponentManager() {
        this._game_elements = new HashMap<String, BasicComponent>();
        this._cnt = 0;
    }

    public void addElement( BasicComponent new_element ) {
        this._game_elements.put( "e" + Integer.toString( this._cnt ), new_element );
        this._cnt += 1;
    }

    public void updateElements( String event ) throws Exception {
        for( Map.Entry<String, BasicComponent> entry : this._game_elements.entrySet() ) {
            entry.getValue().update( event );
        }
    }

    public void drawElements( ShapeRenderer renderer ) throws Exception {
        for( Map.Entry<String, BasicComponent> entry : this._game_elements.entrySet() ) {
            entry.getValue().draw( renderer );
        }
    }
}
