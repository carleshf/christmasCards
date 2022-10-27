package com.kuragari.wc202223.helpers;

public class Collision {
    public String element;
    public CollisionDirection direction;

    public Collision( String element, CollisionDirection direction ) {
        this.element = element;
        this.direction = direction;
    }
}
