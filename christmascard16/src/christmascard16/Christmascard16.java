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
public class Christmascard16 {

    /**
     * @param args the command line arguments
     * @throws java.lang.Exception
     */
    public static void main(String[] args) throws Exception {
        Terminal term  = new Terminal(System.in, System.out);
        MapManager manager = new MapManager();
        
        term.clear();
        
        executeGame(term, manager);
        
        term.close();
    }
    
    /**
    * Main game loop.
    * 
    * @param term
    * @param snake
    */
    @SuppressWarnings("static-access")
    private static void executeGame(Terminal term, MapManager manager) throws Exception {
        boolean continueGame = true;
        String dir = term.KEY_DOWN;

        Map map = manager.nextMap();
        MapView view = new MapView(20, 10, term);

        //view.drawBoarder();
        view.drawContent(map.allElements(), map.direction);

        while (continueGame) {
            
            String input = term.get();
            
            // check whether the input is one of our key sequences, and remember direction
            if (term.KEY_UP.equals(input) || term.KEY_LEFT.equals(input) || 
                    term.KEY_RIGHT.equals(input)) { 
                dir = input; 
            }

            // decide depending on the direction how to move the snake
            if (term.KEY_UP.equals(dir)) { 
                map.snowmanDirectrion('u');
            }
            else if (term.KEY_LEFT .equals(dir)) { 
                map.snowmanDirectrion('l');
            }
            else if (term.KEY_RIGHT.equals(dir)) { 
                map.snowmanDirectrion('r');
            }
            
            char status = map.isEnded();
            if(status == 'd') {
                continueGame = false;
            } else if (status == 'n') {
                map = manager.nextMap();
            }

            try { 
                Thread.sleep(250); 
            } catch (InterruptedException e) {  /* Not important here. Will ignore it and just continue looping. */ }			
        }
    }
}
