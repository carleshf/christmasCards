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
    
    private List<GameElement> board;
    
    private Snowman main;
    private Door exit;
    private Hat token;
    private char play;
    public char direction;
    
    public Map(int width, int height) {
        this.width = width;
        this.height = height;
        this.board = new ArrayList<>();
        this.play = 'y';
        this.direction = 's';
    }
    
    public void addElement(GameElement elm) {
        this.board.add(elm);
    }
    
    public List<GameElement> allElements() {
        List<GameElement> copy = new ArrayList<>(this.board);
        copy.add(this.token);
        copy.add(this.exit);
        copy.add(this.main);
        return(copy);
    }
    
    public void addSnowman(Snowman sm) {
        this.main = sm;
    }
    
    public void addHat(Hat ht) {
        this.token = ht;
    }
    
    public void addDoor(Door dr) {
        this.exit = dr;
    }
    
    public void snowmanDirectrion(char direction) {
        this.direction = direction;
        this.main.setDirection(direction);
    }
    
    public void snowmanHat() {
        this.main.giveHat();
        this.token.setInvisible();
        this.exit.setVisible();
    }
    
    public char isEnded() {
        return(this.play);
    }
    
    public void update() {
        this.main.update(this.board);
        if(this.gotHat()) {
            this.snowmanHat();
        }
        if(this.gotDoor()) {
            this.play = 'n';
        }
    }
    
    private boolean gotHat() {
        return(false);
    }
    
    private boolean gotDoor() {
        return(false);
    }

}

