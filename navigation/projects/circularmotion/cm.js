let particles;
let rcolorScale = Math.floor(Math.random() * 50) + 20;
let gcolorScale = Math.floor(Math.random() * 30) + 10;
let bcolorScale = Math.floor(Math.random() * 80) + 40;

let r;
let g;
let b;

let particleCount = 150;
let orbitSpeed = 0.05;
let explosionForce = 1.5;

function setup() {
	createCanvas(windowWidth, windowHeight);
	particles = [];

	for (let i = 0; i < particleCount; i++) {
		particles.push(new particle(width/2, height/2, random(6, 12)));
	}

	r = rcolorScale;
	g = gcolorScale;
	b = bcolorScale;

	document.body.style.background = `rgba(${r}, ${g}, ${b}, 1)`;
}

function draw() {
	// Reduced trailing effect (increased alpha from 40 to 80)
	noStroke();
	fill(r, g, b, 80);
	rect(0, 0, width, height);
	
	// Update all particles
	for (let i = 0; i < particles.length; i++) {
		const p = particles[i];
		
		// Check if particle is off screen
		if (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
			p.exploding = false;
			p.searching = true;
		}
		
		// Check if particle reached orbit around mouse
		const distToMouse = dist(p.x, p.y, mouseX, mouseY);
		if (distToMouse <= p.xdistance + 20 && p.searching) {
			p.searching = false;
			p.orbitLock = true;
			p.orbitX = mouseX;
			p.orbitY = mouseY;
		}
		
		// Update orbit center to follow mouse smoothly
		if (p.orbitLock && !p.exploding) {
			p.orbitX = lerp(p.orbitX, mouseX, 0.1);
			p.orbitY = lerp(p.orbitY, mouseY, 0.1);
		}
		
		p.update();
		p.draw();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
	// Zoom in/out orbit distance
	for (let i = 0; i < particles.length; i++) {
		particles[i].xdistance = constrain(particles[i].xdistance + (event.delta / 25), 20, 400);
		particles[i].ydistance = constrain(particles[i].ydistance + (event.delta / 25), 20, 400);
	}
}

function mousePressed() {
	// Left click or touch: explode/implode
	for (let i = 0; i < particles.length; i++) {
		if (particles[i].exploding) {
			particles[i].exploding = false;
			particles[i].searching = true;
			particles[i].orbitLock = false;
		} else {
			particles[i].exploding = true;
			particles[i].orbitLock = false;
		}
	}
}

function keyPressed() {
	// Space: reset particles
	if (key === ' ') {
		particles = [];
		for (let i = 0; i < particleCount; i++) {
			particles.push(new particle(mouseX, mouseY, random(6, 12)));
		}
	}
	
	// R: randomize colors
	if (key === 'r' || key === 'R') {
		rcolorScale = Math.floor(Math.random() * 50) + 20;
		gcolorScale = Math.floor(Math.random() * 30) + 10;
		bcolorScale = Math.floor(Math.random() * 80) + 40;
		r = rcolorScale;
		g = gcolorScale;
		b = bcolorScale;
		document.body.style.background = `rgba(${r}, ${g}, ${b}, 1)`;
	}
	
	// I: show instructions
	if (key === 'i' || key === 'I') {
		document.getElementById('instructionsModal').classList.remove('hidden');
	}
}