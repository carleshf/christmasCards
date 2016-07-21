/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package christmascard16;

/**
 *
 * @author carle
 */
public class Christmascard16 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
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
	private static void executeGame(Terminal term, MapManager manager) {
		boolean continueGame = true;
		String dir = term.KEY_UP;
		
                Map map = manager.nextMap();
                MapView view = new MapView(10, 10, term);
                
                view.drawBoarder();
		view.drawContent(map.allElements());
                
		while (continueGame) {
			String input = term.get();
			
			// check whether the input is one of our key sequences, and remember direction
			if (term.KEY_UP   .equals(input))
			//    || term.KEY_DOWN .equals(input)
			//    || term.KEY_LEFT .equals(input)
			//    || term.KEY_RIGHT.equals(input)) 
                                { dir = input; }
			
//			// decide depending on the direction how to move the snake
//			if 		(term.KEY_UP   .equals(dir)) { continueGame = snake.moveUp();    }
//			else if (term.KEY_DOWN .equals(dir)) { continueGame = snake.moveDown();  }
//			else if (term.KEY_LEFT .equals(dir)) { continueGame = snake.moveLeft();  }
//			else if (term.KEY_RIGHT.equals(dir)) { continueGame = snake.moveRight(); }
			
			try { Thread.sleep(250); } catch (InterruptedException e) {  /* Not important here. Will ignore it and just continue looping. */ }			
		}
        }
}
