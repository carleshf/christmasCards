/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package christmascard16;

import java.util.List;

/**
 * This object represents the main character of the game, a snow man that
 * has lost his hat.
 * @author Carles Hernandez-Ferrer
 */
public class Snowman extends GameElement {
    private char direction;
    private boolean hat;
    
    public Snowman(int initPosX, int initPosY) {
        this.posX = initPosX;
        this.posY = initPosY;
        this.width = 3;
        this.level = 4;
        this.direction = 's';
        this.hat = false;
    }
    
    public Snowman(int initPosX, int initPosY, char initDirection, int level) {
        this.posX = initPosX;
        this.posY = initPosY;
        this.width = 3;
        this.level = level;
        this.direction = initDirection;
        this.hat = false;
    }
    
    public void giveHat() {
        this.hat = true;
    }
    
    public void setDirection(char direction) {
        this.direction = direction;
    }

    public void update(List<GameElement> board) {
        if(direction != 's') {
            for(GameElement ob : board) {
                if(direction == 'r') {
                    int ls = ob.getPositions()[ob.getPositions().length];
                    if(this.posX + this.width + 1 == ls) {
                        this.direction = 's';
                    } else {
                        this.posX = this.posX + 1;
                    }
                } else if(direction == 'l') {
                    int ls = ob.getPositions()[0];
                    if(this.posX - 1 == ls) {
                        this.direction = 's';
                    } else {
                        this.posX = this.posX - 1;
                    }
                }
            }
        }
    }
    
    @Override
    public void draw(Terminal term) {
        if(this.hat) {
            term.setCursor(this.posX, this.posY - 2);
            term.put("_¬_");
        }
        term.setCursor(this.posX, this.posY);
        term.put("(O)");
        term.setCursor(this.posX, this.posY - 1);
        term.put("o");
    }
}
