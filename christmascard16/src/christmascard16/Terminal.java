/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package christmascard16;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;

/**
 *
 * @author Carles Hernandez-Ferrer
 */
public class Terminal {

	public static final String KEY_UP = new String("\u001B[A");  // ESC + [A
	public static final String KEY_DOWN = new String("\u001B[B");  // ESC + [B
	public static final String KEY_LEFT = new String("\u001B[D");  // ESC + [D
	public static final String KEY_RIGHT = new String("\u001B[C");  // ESC + [C
	
	private final InputStreamReader in;
	private final PrintStream out;

	/**
	 * Create a terminal wrapper around an input and output stream,
	 * which are typically System.in and System.out.
	 * 
	 * @param in
	 * @param out
	 */
	public Terminal(InputStream in, PrintStream out) {
		this.in  = new InputStreamReader(in);
		this.out = out;
	}

	/**
	 * Clear the terminal, i.e., remove all output.
	 */
	public void clear() {
		out.print("\u001B[2J");  // "\u001B" is the ASCII code for ESC
	}

	/**
	 * Output string and add line break.
	 * 
	 * @param string
	 */
	public void println(String string) {
		out.println(string);
	}

	/**
	 * Cleanup and close terminal.
	 * 
	 * REM: currently a NOP since there is not much to do here.
	 */
	public void close() {}

	/**
	 * Read input from standard in.
	 * It is expected to deliver a sequence of characters for every key press.
	 * The console should be set in an appropriate manner to avoid line buffering. 
	 * @return
	 */
	public String get() {
		char[] buffer = new char[1024];
		String result = "";
		
		try {
			if (!in.ready()) {
				return "";
                        }
			
			int numCharsRead = in.read(buffer);
			result = String.valueOf(buffer, 0, numCharsRead);
		} catch (IOException e) {
			out.println("Could not read a character from input. Should not happen. See details below.");
			e.printStackTrace();
		}
		
		return result;
	}

	/**
	 * Set the cursor for the next output to the given coordinates.
	 * 
	 * @param x
	 * @param y
	 */
	public void setCursor(int x, int y) {
		out.printf("\u001B[%d;%dH", y + 1, x + 1);
	}

	/**
	 * Output the string at the current cursor coordinates.
	 * 
	 * @param string
	 */
	public void put(String string) {
		out.print(string);
	}

}
