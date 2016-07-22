/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package christmascard16;

import java.util.List;

/**
 * The View for the map where the Snowman is placed. It offers a "point of 
 * view" (a piece) of the full map.
 * @author Carles Hernandez-Ferre
 */
public class MapView {

       public int width;
       public int height;
       
       private Terminal term;
       
       public MapView(int width, int height, Terminal term) {
           this.width = width;
           this.height = height;
           this.term = term;
       }

//	public BoardView(Object[][] board, Terminal term) {
//		width  	  = board[0].length;
//		height 	  = board.length;
//		this.term = term;
//		this.board = board;
//	}

//	/**
//	 * Draws the surrounding border in the following style:
//	 * 
//	 *   /----\
//	 *   |    |
//	 *   |    |
//	 *   \----/
//	 */
//	public void drawBoarder() {
//            this.term.setCursor(0, 0);
//            this.term.put("/");
//            for (int i = 0; i < this.width; i++) { 
//                this.term.put("-"); 
//            }
//            this.term.put("\\");
//
//            for (int i = 0; i < height; i++) {
//                this.term.setCursor(        0, i + 1);
//                this.term.put("|");
//                this.term.setCursor(width + 1, i + 1);
//                this.term.put("|");
//            }
//            this.term.put("\n");
//
//            this.term.put("\\");
//            for (int i = 0; i < width; i++) { 
//                this.term.put("-"); 
//            }
//            this.term.put("/");
//	}

//	public void add(Apple apple) {
//		term.setCursor(apple.getX() + 1, apple.getY() + 1);
//		term.put("o");
//	}
//	
//	public void add(SnakeElement elem) {
//		term.setCursor(elem.getX() + 1, elem.getY() + 1);
//		term.put("#");
//	}
//	
//	public void remove(GameElement elem) {
//		term.setCursor(elem.getX() + 1, elem.getY() + 1);
//		term.put(" ");
//	}

//	public void showContent() {
//		for (Object[] row : board) {
//			for (Object elem : row) {
//				if (elem instanceof Apple) {
//					add((Apple)elem);
//				}
//				else if (elem instanceof SnakeElement) {
//					add((SnakeElement)elem);
//				}
//			}
//		}
//	}
        
        public void drawContent(List<GameElement> elms, char direction) throws Exception {
            for(GameElement elm : elms) {
                elm.draw(this.term);
            }
            term.setCursor(0, 7);
            term.put("Direction: " + direction);
        }
}
