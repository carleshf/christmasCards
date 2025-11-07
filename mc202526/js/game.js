// Game variables
let player;

// Setup function runs once at the start
function setup() {
    createCanvas(800, 600);
    // Initialize your game objects here
    player = {
        x: width/2,
        y: height/2,
        size: 30
    };
}

// Draw function runs continuously
function draw() {
    background(220);
    
    // Draw player
    fill(0, 255, 0);
    circle(player.x, player.y, player.size);
    
    // Add your game logic here
}

// Handle keyboard input
function keyPressed() {
    // Add your keyboard controls here
}

// Handle mouse input
function mousePressed() {
    // Add your mouse controls here
}