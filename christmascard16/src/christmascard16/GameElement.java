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
public class GameElement {
    protected int posX;
    protected int posY;
    protected int level;
    protected int width;
    
    public int get_posX() {
        return(this.posX);
    }
    
    public int get_posY() {
        return(this.posY);
    }
    
    public int[] getPositions() {
        int[] pos = new int[this.width];
        for(int ii = 0; ii < this.width; ii++) {
            pos[ii] = ii + this.width;
        }
        return(pos);
    }
    
    public void draw(Terminal term) throws Exception {
        throw new Exception("Unimplemented method.");
    }
}
