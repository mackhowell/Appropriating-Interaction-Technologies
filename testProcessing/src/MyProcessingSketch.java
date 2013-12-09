//Ju Young Park
//ITP 2013
//Appropriating Technology

import java.applet.Applet;
import java.applet.AppletContext;
import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.List;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

import oscP5.OscMessage;
import oscP5.OscP5;
import processing.core.*;

import javax.imageio.ImageIO;
import javax.script.*;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JWindow;






public class MyProcessingSketch extends PApplet {
	PImage backgroundimg;
	
	JWindow frame;
	Boolean f = false;
	URL myURL;
	URLConnection myURLConnection;
	int randomX, randomY, randomN;
	ArrayList<String> imagelist = new ArrayList<String>();
	ArrayList<Integer> list = new ArrayList<Integer>();
	public void setup() {
//	    size(100,100);
//	    background(0);
		backgroundimg = loadImage("https://dl.dropboxusercontent.com/u/25227498/Screen%20Shot%202013-11-18%20at%202.00.18%20PM.png");
	    OscP5 oscP5;
	    oscP5 = new OscP5(this, 8338);
	    // Plug in the blink gesture
	    oscP5.plug(this, "blink", "/gesture/blink");
	    
	    imagelist.add("https://dl.dropboxusercontent.com/u/25227498/0.png");
	    imagelist.add("https://dl.dropboxusercontent.com/u/25227498/1.png");
	    imagelist.add("https://dl.dropboxusercontent.com/u/25227498/2.png");
	    imagelist.add("https://dl.dropboxusercontent.com/u/25227498/4.png");
	    imagelist.add("https://dl.dropboxusercontent.com/u/25227498/5.png");
	    imagelist.add("https://dl.dropboxusercontent.com/u/25227498/6.png");
	    imagelist.add("https://dl.dropboxusercontent.com/u/25227498/7.png");
	    imagelist.add("https://dl.dropboxusercontent.com/u/25227498/8.png");
	    imagelist.add("https://dl.dropboxusercontent.com/u/25227498/9.png");
	    imagelist.add("https://dl.dropboxusercontent.com/u/25227498/10.png");
	    
	    
		  
	    list.add(150);
	    list.add(200);
	    list.add(250);
	    list.add(300);
	    list.add(350);
	    
	  }

	  public void draw() {
		image(backgroundimg, 0, 0);
	    
	    randomX = 900;
    	//randomY = 150 + (int) (Math.random() * (150 - 350));
    	randomY = (int)(Math.random() * list.size()-1);
    	randomN = (int)(Math.random() * imagelist.size()-1);
    	
       try {
            //sending the actual Thread of execution to sleep X milliseconds
            Thread.sleep(2500);
          //  f= false;
        } catch(InterruptedException ie) {}
        String path = imagelist.get(randomN);
        URL url = null;
		try {
			url = new URL(path);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        BufferedImage image = null;
		try {
			image = ImageIO.read(url);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        JLabel label = new JLabel(new ImageIcon(image));
        
          frame = new JWindow();
          frame.setBackground(new Color(0,0,0,0));
          frame.setContentPane(new TranslucentPane());
          frame.getContentPane().add(label);
          frame.pack();
          frame.setSize(200,100);
		  frame.setLocation(randomX, list.get(randomY));
		  frame.setVisible(true);
	    
	    //if(f==true){
			  //makeNewFrame();
			  //f = false;
	   //}
	    
	    
	  }
	  /*
	  public void makeNewFrame(){
		  
		    randomX = 900;
	    	//randomY = 150 + (int) (Math.random() * (150 - 350));
	    	randomY = (int)(Math.random() * list.size()-1);
	    	randomN = (int)(Math.random() * imagelist.size()-1);
	    	
	       try {
	            //sending the actual Thread of execution to sleep X milliseconds
	            Thread.sleep(2500);
	          //  f= false;
	        } catch(InterruptedException ie) {}
	        String path = imagelist.get(randomN);
	        URL url = null;
			try {
				url = new URL(path);
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        BufferedImage image = null;
			try {
				image = ImageIO.read(url);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        JLabel label = new JLabel(new ImageIcon(image));
	        
	          frame = new JWindow();
	          frame.setBackground(new Color(0,0,0,0));
              frame.setContentPane(new TranslucentPane());
	          frame.getContentPane().add(label);
	          //frame.
	          frame.pack();
	          frame.setSize(200,100);
			  frame.setLocation(randomX, list.get(randomY));
			  //frame.setUndecorated(true);
			  frame.setVisible(true);
		  
	  }
	  
	  public void mousePressed(MouseEvent e) {
		  //f = true;
	       //frame.dispose();
	    }
	  
	  public void keyPressed(KeyEvent e) {
	        // Invoked when a key has been pressed.
	        if (e.getKeyCode() == KeyEvent.VK_ENTER ) {
	        	frame.dispose();
	        	//VK_SPACE 
	        	//f= false;
	        	
	        }
	        if (e.getKeyCode() == KeyEvent.VK_SPACE ) {
	        	f = true;
	        }
	    }
	  
	*/
	  public void blink(int state) throws ScriptException{

		  if (state == 1) {
			  executeScript();
			  println("blink");
		  
		  }
	  

	  }
	  public void executeScript(){

				  frame.dispose();

	  }
		
	  public void oscEvent(OscMessage theOscMessage) {
		  if (theOscMessage.isPlugged()==false) {
		    //println("UNPLUGGED: " + theOscMessage);
		  }
	  }


	  public static void main(String args[]) {
		    PApplet.main(new String[] { "--present", "MyProcessingSketch" });

	  }
	  
	  public class TranslucentPane extends JPanel {

	        public TranslucentPane() {
	            setOpaque(false);
	        }

	        @Override
	        protected void paintComponent(Graphics g) {
	            super.paintComponent(g); 

	            Graphics2D g2d = (Graphics2D) g.create();
	            g2d.setComposite(AlphaComposite.SrcOver.derive(0.85f));
	            g2d.setColor(getBackground());
	            g2d.fillRect(0, 0, getWidth(), getHeight());

	        }

	    }
	  
}


