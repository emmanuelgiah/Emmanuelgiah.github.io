let t = 0;
let x1, x2, y1, y2;
let inside1, scale1, inside2, scale2;
let rcolorScale = Math.floor(Math.random() * 25);
let gcolorScale = Math.floor(Math.random() * 25);
let bcolorScale = Math.floor(Math.random() * 25);
let r, g, b;
let speed = 0.25;
let lineCount = 20;
let strokeW = 10;

function setup() {
	createCanvas(windowWidth, windowHeight);
	resetParameters();
	
	r = rcolorScale;
	g = gcolorScale;
	b = bcolorScale;

	document.body.style.background = `rgba(${r}, ${g}, ${b}, 1)`;
}

function resetParameters() {
	x1 = 0;
	x2 = 0;
	y1 = 0;
	y2 = 0;

	inside1 = (Math.random() * 30) + 10;
	scale1 = (Math.random() * 200) + 100;

	inside2 = (Math.random() * 30) + 10;
	scale2 = (Math.random() * 200) + 100;
}

function draw() {
	translate(0, 0);
	fill(r, g, b, 255);
	noStroke();
	rect(0, 0, width, height);
	
	translate(width/2, height/2);
	stroke(b, 25, 25);
	strokeWeight(strokeW);
	
	for (let i = 2; i < lineCount; i += 2) {
		// Consistent gradient based on position in loop (not time-based)
		let rMod = r * i;
		let gMod = g * i;
		let bMod = b * i;
		
		stroke(rMod, gMod, bMod);

		x1 = changeX1(t + i);
		x2 = changeX2(t + i);
		y1 = changeY1(t + i);
		y2 = changeY2(t + i);
		line(x1, y1, x2, y2);
	}
	
	t += speed;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
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

function mousePressed() {
	// Reset with new parameters
	resetParameters();
	t = 0;
}

function keyPressed() {
	// Space: reset
	if (key === ' ') {
		resetParameters();
		t = 0;
	}
	
	// R: randomize colors
	if (key === 'r' || key === 'R') {
		rcolorScale = Math.floor(Math.random() * 25);
		gcolorScale = Math.floor(Math.random() * 25);
		bcolorScale = Math.floor(Math.random() * 25);
		r = rcolorScale;
		g = gcolorScale;
		b = bcolorScale;
		document.body.style.background = `rgba(${r}, ${g}, ${b}, 1)`;
	}
	
	// Arrow keys: adjust speed
	if (keyCode === UP_ARROW) {
		speed = Math.min(speed + 0.05, 2);
	}
	if (keyCode === DOWN_ARROW) {
		speed = Math.max(speed - 0.05, 0.05);
	}
	
	// +/-: adjust line count
	if (key === '+' || key === '=') {
		lineCount = Math.min(lineCount + 2, 40);
	}
	if (key === '-' || key === '_') {
		lineCount = Math.max(lineCount - 2, 4);
	}
	
	// I: show instructions
	if (key === 'i' || key === 'I') {
		document.getElementById('instructionsModal').classList.remove('hidden');
	}
}