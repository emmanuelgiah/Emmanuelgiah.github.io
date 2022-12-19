var ball;
var heroPaddle;
var heroSize = 100;
var heroVelocity = 0;
var bounceVelocity = 0;
var heroFriction = 0.88;

function setup() {
	createCanvas(windowWidth-20, windowHeight-20);
	heroPaddle = new paddle(width/8, height/2, heroSize);
	ball = new ball(windowHeight/6, (windowHeight/2 + heroSize/2), 15);
}

function draw() {
	//Game Design
	background(25, 40, 105);
	heroPaddle.draw();
	//movement
	if (keyIsPressed) {
		if (keyCode === 40 || keyCode === DOWN_ARROW) {
			heroVelocity = keyCode;
			heroPaddle.strafe(heroVelocity);
		} else if (keyCode === 38 || keyCode === UP_ARROW) {
			heroVelocity = keyCode;
			heroPaddle.strafe(heroVelocity);
		} else if (keyCode === 32 || keyCode === RIGHT_ARROW) {
			bounceVelocity = keyCode;
		}
	}
	
	//screen looping
	if (heroPaddle.ypos < (0 - heroSize)) {
		heroPaddle.ypos = height;
	} else if (heroPaddle.ypos > (height)) {
		heroPaddle.ypos = 0;
	}
	//bounce physics
	ball.bounce(bounceVelocity);
	ball.draw();
	heroVelocity *= 0.88;
}


function windowResized() {
	resizeCanvas(windowWidth-20, windowHeight-20);
	//scales the position of our hero
	heroPaddle = windowWidth/2 - h.size;
	h.x1 = h.x2 - h.size;
	h.x3 = h.x2 + h.size;
	//scales the y position of our hero
	heroPaddle = height-25;
	h.y2 = h.y1 - h.size;
	h.y3 = h.y1;
}