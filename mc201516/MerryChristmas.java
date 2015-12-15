import java.util.List;
import java.util.ArrayList;
import java.util.Random;
import java.lang.Thread;
import java.io.IOException;

public class MerryChristmas {
    public static void clc (int n) {
        for(int ii = 0; ii < n; ii++) { System.out.println(""); }
    }
    public static void wait(int s) {
        try { Thread.sleep(s * 1000); } catch(InterruptedException e){ }
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
            "     _",
            "   _[_]_",
            "    (\")",
            "`--( : )--'",
            "  (  :  )",
            "\"\"`-...-'\"\""
        });
        figures.add(new String[] {
            "_/\\_     __/\\__",
            ")   (_  _) .' (",
            "`) '.( ) .'  (`",
            " `-._\\()/__(~`",
            "     ()()",
            "    / |`\\",
            "    ) : (",
            "    `)_/`"
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
        figures.add(new String[] {
            "     _",
            "   _[_]_  I WISH YOU A",
            "    (\") MERRY CHRISTMAS",
            "`--( : )--'   by C.",
            "  (  :  )",
            "\"\"`-...-'\"\""
        });
        figures.add(new String[] {
            "_/\\_     __/\\__",
            ")   (_  _) .' (",
            "`) '.( ) .'  (`",
            " `-._\\()/__(~` MERRY CHRISTMAS",
            "     ()()   & HAPPY NEW YEAR",
            "    / |`\\        by C.",
            "    ) : (",
            "    `)_/`"
        });

        int all = 200;
        int prt = 25;
        int inc = 4;
        String pad = "          ";

        clc(all);
        Random randomGenerator = new Random();
        int sel =  randomGenerator.nextInt(4);

        if(args.length != 0) {
            prt = Integer.parseInt(args[0]);
        }
        if(prt < figures.get(sel).length) {
            prt = figures.get(sel).length + 1;
        }
        
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
        clc(prt - figures.get(sel + inc).length - 1);

        System.out.println("Please, press any key to end the program ...");
        
        try{ System.in.read(); } catch (IOException e) { }
    }
}