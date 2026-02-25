// Pong Game - Vaporwave Aesthetic
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 120;
const BALL_SIZE = 16;
const BALL_SPEED = 6;
const PADDING = 60;

let userPaddle;
let aiPaddle;
let ball;
let ballVelX = BALL_SPEED;
let ballVelY = BALL_SPEED;
let userScore = 0;
let aiScore = 0;

// Updated gradient colors - darker, moodier palette
const gradientStart = { r: 80, g: 20, b: 30 };
const gradientEnd = { r: 20, g: 40, b: 60 };
const accentColor = { r: 255, g: 100, b: 200 };
const glowColor = { r: 100, g: 200, b: 255 };

function setup() {
	const canvas = createCanvas(windowWidth - 200, windowHeight - 200);
	canvas.parent('game-container');
	
	userPaddle = new Paddle(30, height / 2, true);
	aiPaddle = new Paddle(width - 40, height / 2, false);
	resetBall();
	
	frameRate(60);
}

function draw() {
	// Trailing effect - semi-transparent background
	fill(gradientStart.r, gradientStart.g, gradientStart.b, 40);
	noStroke();
	rect(0, 0, width, height);
	
	// Gradient overlay
	drawGradientBackground();
	
	// Draw center line
	drawCenterLine();
	
	// Update and draw paddles
	userPaddle.update();
	userPaddle.draw();
	
	aiPaddle.followBall(ball);
	aiPaddle.draw();
	
	// Update and draw ball
	updateBall();
	drawBall();
	
	// Check collisions
	checkPaddleCollision();
	checkWallCollision();
	
	// Draw scores
	drawScores();
}

function drawGradientBackground() {
	// Create subtle gradient overlay
	for (let y = 0; y < height; y += 4) {
		const inter = map(y, 0, height, 0, 1);
		const r = lerp(gradientStart.r, gradientEnd.r, inter);
		const g = lerp(gradientStart.g, gradientEnd.g, inter);
		const b = lerp(gradientStart.b, gradientEnd.b, inter);
		
		stroke(r, g, b, 20);
		line(0, y, width, y);
	}
}

function drawCenterLine() {
	stroke(255, 255, 255, 30);
	strokeWeight(2);
	for (let i = 0; i < height; i += 20) {
		line(width / 2, i, width / 2, i + 10);
	}
}

function drawScores() {
	fill(255, 255, 255, 80);
	noStroke();
	textAlign(CENTER);
	textSize(48);
	textFont('Heebo');
	
	text(userScore, width / 4, 60);
	text(aiScore, (width * 3) / 4, 60);
}

function resetBall() {
	ball = {
		x: width / 2,
		y: height / 2
	};
	
	// Random direction
	const angle = random(-PI / 4, PI / 4);
	const direction = random() > 0.5 ? 1 : -1;
	ballVelX = cos(angle) * BALL_SPEED * direction;
	ballVelY = sin(angle) * BALL_SPEED;
}

function updateBall() {
	ball.x += ballVelX;
	ball.y += ballVelY;
	
	// Score points
	if (ball.x < 0) {
		aiScore++;
		resetBall();
	} else if (ball.x > width) {
		userScore++;
		resetBall();
	}
}

function drawBall() {
	// Reduced glow effect
	noStroke();
	fill(glowColor.r, glowColor.g, glowColor.b, 15);
	ellipse(ball.x, ball.y, BALL_SIZE * 3, BALL_SIZE * 3);
	
	fill(glowColor.r, glowColor.g, glowColor.b, 30);
	ellipse(ball.x, ball.y, BALL_SIZE * 2, BALL_SIZE * 2);
	
	// Ball
	fill(255, 255, 255, 255);
	ellipse(ball.x, ball.y, BALL_SIZE, BALL_SIZE);
}

function checkPaddleCollision() {
	// User paddle collision
	if (ball.x - BALL_SIZE / 2 <= userPaddle.x + PADDLE_WIDTH &&
		ball.y >= userPaddle.y &&
		ball.y <= userPaddle.y + PADDLE_HEIGHT &&
		ballVelX < 0) {
		
		ballVelX = abs(ballVelX) * 1.05;
		
		// Add spin based on where ball hits paddle
		const hitPos = (ball.y - userPaddle.y) / PADDLE_HEIGHT;
		ballVelY = (hitPos - 0.5) * BALL_SPEED * 2;
	}
	
	// AI paddle collision
	if (ball.x + BALL_SIZE / 2 >= aiPaddle.x &&
		ball.y >= aiPaddle.y &&
		ball.y <= aiPaddle.y + PADDLE_HEIGHT &&
		ballVelX > 0) {
		
		ballVelX = -abs(ballVelX) * 1.05;
		
		const hitPos = (ball.y - aiPaddle.y) / PADDLE_HEIGHT;
		ballVelY = (hitPos - 0.5) * BALL_SPEED * 2;
	}
}

function checkWallCollision() {
	if (ball.y <= BALL_SIZE / 2 || ball.y >= height - BALL_SIZE / 2) {
		ballVelY *= -1;
		ball.y = constrain(ball.y, BALL_SIZE / 2, height - BALL_SIZE / 2);
	}
}

function windowResized() {
	resizeCanvas(windowWidth - 200, windowHeight - 200);
	userPaddle.y = height / 2;
	aiPaddle.y = height / 2;
	aiPaddle.x = width - 40;
}
