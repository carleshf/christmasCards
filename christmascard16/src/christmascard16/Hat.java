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
public class Hat extends GameElement {
    private boolean show;
    
    public Hat(int posX, int posY) {
        this.posX = posX;
        this.posY = posY;
        this.width = 3;
        this.level = 3;
        this.show = true;
    }
    
    public Hat(int posX, int posY, int level) {
        this.posX = posX;
        this.posY = posY;
        this.width = 3;
        this.level = level;
        this.show = true;
    }
    
    public void setInvisible() {
        this.show = false;
    }
    
    @Override
    public void draw(Terminal term) {
        if(this.show) {
            term.setCursor(this.posX, this.posY);
            term.put("_|_");
        }
    }
}
