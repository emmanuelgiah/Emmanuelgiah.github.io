var userPaddle;

function setup() {
	createCanvas(windowWidth, windowHeight);
	userPaddle = new paddle(25, height/2);
}

function draw() {
	background("rgba(0, 0, 0, 1)");
	userPaddle.draw();
}

function windowResized() {
	re
}