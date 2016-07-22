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
public class Post extends GameElement {
    private final char direction;
    
    public Post(int posX, int posY, char direction) {
        this.posX = posX;
        this.posY = posY;
        this.width = 1;
        this.direction = direction;
        this.level = 1;
    }
    
    public Post(int posX, int posY, char direction, int level) {
        this.posX = posX;
        this.posY = posY;
        this.width = 1;
        this.direction = direction;
        this.level = level;
    }
    
    @Override
    public void draw(Terminal term) {
        term.setCursor(this.posX, this.posY);
        term.put("#");
        term.setCursor(this.posX, this.posY - 1);
        term.put("#");
        term.setCursor(this.posX, this.posY - 2);
        term.put("#");
        term.setCursor(this.posX, this.posY - 3);
        if(this.direction == 'r') {
            term.put(">");
        } else {
            term.put("<");
        }
    }
}
