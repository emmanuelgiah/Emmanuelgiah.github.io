var heroPaddle;
var enemyPaddle;

function setup() {
	createCanvas(windowWidth-20, windowHeight-20);
	heroPaddle = new paddle(25, height/2);
	enemyPaddle = new paddle(25, height/2);
	ball = new ball(windowWidth/2, windowHeight/2, 10);
}

function draw() {
	background("rgba(0, 0, 0, 1)");
	heroPaddle.draw();
	enemyPaddle.draw();
	ball.draw();
}	

function windowResized() {
	resizeCanvas(windowWidth-20, windowHeight-20);
}