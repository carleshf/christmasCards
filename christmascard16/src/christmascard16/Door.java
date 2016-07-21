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
public class Door extends GameElement {
    private boolean show;
    
    public Door(int posX, int posY) {
        this.posX = posX;
        this.posY = posY;
        this.level = 3;
        this.show = false;
    }
    
    public Door(int posX, int posY, int level) {
        this.posX = posX;
        this.posY = posY;
        this.level = level;
        this.show = false;
    }
    
    public void set_visible() {
        this.show = true;
    }
    
    @Override
    public void draw(Terminal term) {
        if(this.show) {
            term.setCursor(this.posX, this.posY);
            term.put("|");
            term.setCursor(this.posX + 1, this.posY);
            term.put("|");
            term.setCursor(this.posX, this.posY + 1);
            term.put("/");
            term.setCursor(this.posX + 1, this.posY + 1);
            term.put("\\");
        }
    }
}
