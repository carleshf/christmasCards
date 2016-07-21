/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package christmascard16;

/**
 * This object represents the main character of the game, a snow man that
 * has lost his hat.
 * @author Carles Hernandez-Ferrer
 */
public class Snowman extends GameElement {
    private final char direction;
    private final int speed;
    private boolean hat;
    
    public Snowman(int initPosX, int initPosY, char initDirection) {
        this.posX = initPosX;
        this.posY = initPosY;
        this.level = 4;
        this.direction = initDirection;
        this.speed = 1;
        this.hat = false;
    }
    
    public Snowman(int initPosX, int initPosY, char initDirection, int initSpeed, int level) {
        this.posX = initPosX;
        this.posY = initPosY;
        this.level = level;
        
        this.direction = initDirection;
        this.speed = initSpeed;  
        this.hat = false;
    }
    
    public void give_hat() {
        this.hat = true;
    }
    
    @Override
    public void draw(Terminal term) {
        if(this.hat) {
            term.setCursor(this.posX - 1, this.posY + 2);
            term.put("_¬_");
        }
        term.setCursor(this.posX - 1, this.posY);
        term.put("(O)");
        term.setCursor(this.posX + 1, this.posY + 1);
        term.put("o");
    }
}
