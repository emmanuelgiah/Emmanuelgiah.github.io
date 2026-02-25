let t = 0;
let x1;
let x2;
let y1;
let y2;

let inside1;
let scale1;

let inside2;
let scale2;

let rcolorScale = Math.floor(Math.random() * 25);
let gcolorScale = Math.floor(Math.random() * 25);
let bcolorScale = Math.floor(Math.random() * 25);

let r;
let g;
let b;

function setup() {
	createCanvas(windowWidth-75, windowHeight-75);
	x1 = 0;
	x2 = 0;
	y1 = 0;
	y2 = 0;

	// Increased range for more variation (higher standard deviation)
	// Raised floor from 0 to minimum values to avoid short/fast lines
	inside1 = (Math.random() * 30) + 10;  // Range: 10-40 (was 0-20)
	scale1 = (Math.random() * 200) + 100; // Range: 100-300 (was 50-200)

	inside2 = (Math.random() * 30) + 10;  // Range: 10-40 (was 0-20)
	scale2 = (Math.random() * 200) + 100; // Range: 100-300 (was 50-200)

	r = rcolorScale;
	g = gcolorScale;
	b = bcolorScale;

	document.body.style.background = "rgba(" + r + ", " + g + ", " + b + ", 1)";
}

function draw() {
	translate(0, 0);
	fill("rgba(" + r + ", " + g + ", " + b + ", 1)");
	noStroke();
	rect(0, 0, windowWidth - 19.5001, windowHeight - 19.5001);
	
	translate(windowWidth/2, windowHeight/2);
	stroke(b, 25, 25);
	strokeWeight(10);
	for (var i = 2; i < 20; i += 2) {
		r *= i;
		g *= i;
		b *= i;
		stroke(r, g, b);

		x1 = changeX1(t + i);
		x2 = changeX2(t + i);
		y1 = changeY1(t + i);
		y2 = changeY2(t + i);
		line(x1, y1, x2, y2);

		r = rcolorScale;
		g = gcolorScale;
		b = bcolorScale;
	}
	t += 0.25;

}

function windowResized() {
	resizeCanvas(windowWidth - 75, windowHeight - 75);
}

function changeX1(t) {
	return Math.cos(t / inside1) * scale1 + Math.cos(t / scale2) * scale2;
}
function changeX2(t) {
	return Math.cos(t / inside2) * scale2 + Math.cos(t / inside1) * scale1;
}
function changeY1(t) {
	return Math.sin(t / inside2) * scale2 + Math.sin(t / scale2) * inside1;
}
function changeY2(t) {
	return Math.sin(t / inside1) * scale1 + Math.sin(t / scale1) * scale1;
}