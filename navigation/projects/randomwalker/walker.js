// Random Walker - Refactored
const CANVAS_PADDING = 10;
const STROKE_WEIGHT = 4;
const STROKE_ALPHA = 50;
const DEFAULT_SPEED = 20;
const RESET_SPEED = 25;

let startX = 0;
let startY = 0;
let speed = DEFAULT_SPEED;
let lineStrokeA;
let lineStrokeB;
let points = [];

function setup() {
	createCanvas(windowWidth - CANVAS_PADDING, windowHeight - 20);
	startX = width / 2;
	startY = height / 2;
	lineStrokeA = random(100);
	lineStrokeB = random(100);
}

function draw() {
	const distX = random(-speed, speed);
	const distY = random(-speed, speed);
	
	const newX = startX + distX;
	const newY = startY + distY;
	
	if (isWithinBounds(newX, newY)) {
		drawLine(startX, startY, newX, newY);
		startX = newX;
		startY = newY;
		points.push([newX, newY]);
	} else {
		renderTrail();
		noLoop();
	}
}

function isWithinBounds(x, y) {
	return x > 0 && x < width && y > 0 && y < height;
}

function drawLine(x1, y1, x2, y2) {
	strokeWeight(STROKE_WEIGHT);
	stroke(255, 255, 255, STROKE_ALPHA);
	line(x1, y1, x2, y2);
}

function renderTrail() {
	background(0);
	const trailLength = Math.floor(points.length / 30);
	const red = Math.floor(random(100));
	const green = Math.floor(random(100));
	
	for (let i = 0; i < points.length - trailLength; i += trailLength) {
		const [x1, y1] = points[i];
		const [x2, y2] = points[i + trailLength];
		
		const color1 = color(red + i, green, lineStrokeA);
		const color2 = color(red + i, green, lineStrokeB);
		
		gradientLine(x1, y1, x2, y2, color1, color2, 2);
	}
}

function gradientLine(x1, y1, x2, y2, c1, c2, size) {
	const distance = dist(x1, y1, x2, y2);
	
	for (let i = 0; i < distance; i++) {
		const step = map(i, 0, distance, 0, 1);
		const x = lerp(x1, x2, step);
		const y = lerp(y1, y2, step);
		const c = lerpColor(c1, c2, step);
		
		fill(c);
		noStroke();
		ellipse(x, y, size, size);
	}
}

function mousePressed() {
	resetWalker();
	loop();
}

function resetWalker() {
	background(0);
	lineStrokeA = random(100);
	lineStrokeB = random(100);
	startX = mouseX;
	startY = mouseY;
	speed = RESET_SPEED;
	points = [];
}

function windowResized() {
	resizeCanvas(windowWidth - 20, windowHeight - 20);
}
