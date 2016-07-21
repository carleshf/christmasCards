/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package christmascard16;

/**
 *
 * @author Carles Hernandez-Ferrer
 */
public class Floor extends GameElement {
    private final int width;
    
    public Floor(int posX, int posY, int width) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.level = 0;
    }
    
    public Floor(int posX, int posY, int width, int level) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.level = level;
    }
    
    @Override
    public void draw(Terminal term) {
        term.setCursor(this.posX, this.posY);
        for(int ii=0; ii < this.width; ii++) {
            term.setCursor(this.posX + ii, this.posY);
            term.put("~");
        }
    }
}