/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package christmascard16;

import java.util.List;
import java.util.ArrayList;

/**
 * This object will contain the multiple elements used to draw a the different
 * scenarios the Snowman will need to travel for to find his hat.
 * @author Carles Hernandez-Ferrer
 */
public class Map {
    public int width;
    public int height;
    
    private List<GameElement> objects;
    
    public Map(int width, int height) {
        this.width = width;
        this.height = height;
        this.objects = new ArrayList<>();
    }
    
    public void addElement(GameElement elm) {
        this.objects.add(elm);
    }
    
    public List<GameElement> allElements() {
        return(this.objects);
    }
}


