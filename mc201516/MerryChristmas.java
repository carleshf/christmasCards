import java.util.List;
import java.util.ArrayList;
import java.util.Random;
import java.lang.Thread;

public class MerryChristmas {
    public static void clc (int n) {
        for(int ii = 0; ii < n; ii++) { System.out.println(); }
    }
    public static void wait(int s) {
        try { 
            Thread.sleep(s * 1000);
        } catch(InterruptedException e){ 
            //Perform your exception handling
        }
    }

    public static void main(String[] args) { 
        ArrayList<String[]> figures = new ArrayList<String[]>();
        figures.add(new String[] {
            "   -=-",
            "(\\  _  /)",
            "( \\( )/ )",
            "(       )",
            " `>   <´",
            " /     \\",
            " `-._.-'"
        });
        figures.add(new String[] {
            "  ,\"\"\"-,",
            " /,.____\\",
            "() {_____}",
            "  (/ . . \\)",
            "  {`-=^=-`}",
            "  {   `   }",
            "   {     }",
            "    `-,-"
        });
        figures.add(new String[] {
            "   -=-",
            "(\\  _  /)",
            "( \\( )/ ) MERRY CHRISTMAS &",
            "(       )       HAPPY NEW YEAR",
            " `>   <´      by C.",
            " /     \\",
            " `-._.-'"
        });
        figures.add(new String[] {
            "  ,\"\"\"-,",
            " /,.____\\",
            "() {_____}     HO HO HO!",
            "  (/ . . \\)     MERRY CHRISTMAS",
            "  {`-=^=-`}        by C.",
            "  {   `   }",
            "   {     }",
            "    `-,-"
        });

        int all = 75;
        int prt = 50;
        int inc = 2;
        String pad = "          ";

        clc(all);
        Random randomGenerator = new Random();
        int sel = randomGenerator.nextInt(2);
        for(int ii = 0; ii < figures.get(sel).length + 1; ii++) {
            clc(all);
            for(int jj = 0; jj < ii; jj++) {
                System.out.println(pad + figures.get(sel)[jj]);
            } 
            clc(prt - ii);
            wait(1);
        }
        clc(all);
        for(String line : figures.get(sel + inc)) {
            System.out.println(pad + line);
        }
        clc(prt - figures.get(sel + inc).length);
    }
}