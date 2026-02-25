// Random Walker - Enhanced Edition
class Walker {
	constructor(x, y, hue) {
		this.x = x;
		this.y = y;
		this.prevX = x;
		this.prevY = y;
		this.hue = hue;
		this.steps = 0;
		this.totalDistance = 0;
		this.trail = [];
		this.maxTrailLength = 100;
		this.size = 8;
		this.speed = 3;
		this.alive = true;
		this.alpha = 255;
		this.deathPath = [];
	}
	
	step(mode, wrapMode, allWalkers) {
		if (!this.alive) {
			// Fade out dead walker
			this.alpha -= 2;
			return;
		}
		
		this.prevX = this.x;
		this.prevY = this.y;
		
		let stepSize = this.speed;
		
		// Different movement modes
		if (mode === 'levy') {
			if (random(1) < 0.1) {
				stepSize *= random(5, 15);
			}
		} else if (mode === 'biased') {
			const centerX = width / 2;
			const centerY = height / 2;
			const angleToCenter = atan2(centerY - this.y, centerX - this.x);
			const bias = 0.3;
			
			this.x += cos(angleToCenter) * stepSize * bias + random(-stepSize, stepSize) * (1 - bias);
			this.y += sin(angleToCenter) * stepSize * bias + random(-stepSize, stepSize) * (1 - bias);
		}
		
		if (mode !== 'biased') {
			this.x += random(-stepSize, stepSize);
			this.y += random(-stepSize, stepSize);
		}
		
		// Check collision with other walkers
		for (let other of allWalkers) {
			if (other !== this && other.alive) {
				const d = dist(this.x, this.y, other.x, other.y);
				if (d < this.size * 2) {
					this.die('collision');
					other.die('collision');
					return;
				}
			}
		}
		
		// Handle boundaries
		if (wrapMode) {
			if (this.x < 0) this.x = width;
			if (this.x > width) this.x = 0;
			if (this.y < 0) this.y = height;
			if (this.y > height) this.y = 0;
		} else {
			// Check if escaped
			if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
				this.die('escape');
				return;
			}
		}
		
		// Update stats
		const stepDist = dist(this.prevX, this.prevY, this.x, this.y);
		this.totalDistance += stepDist;
		this.steps++;
		
		// Update trail
		this.trail.push({ x: this.x, y: this.y });
		if (this.trail.length > this.maxTrailLength) {
			this.trail.shift();
		}
	}
	
	die(reason) {
		this.alive = false;
		
		// Save death path
		this.deathPath = [...this.trail];
		
		// Create particles
		for (let i = 0; i < 20; i++) {
			particles.push(new Particle(this.x, this.y, this.hue));
		}
	}
	
	draw() {
		// Draw death path if dead
		if (!this.alive && this.deathPath.length > 1) {
			stroke(this.hue, 255, 255, this.alpha * 0.5);
			strokeWeight(2);
			noFill();
			beginShape();
			for (let point of this.deathPath) {
				vertex(point.x, point.y);
			}
			endShape();
		}
		
		if (!this.alive && this.alpha <= 0) return;
		
		// Draw trail with gradient
		for (let i = 0; i < this.trail.length - 1; i++) {
			const alpha = map(i, 0, this.trail.length, 50, 200) * (this.alpha / 255);
			const weight = map(i, 0, this.trail.length, 1, 3);
			
			stroke(this.hue, 200, 255, alpha);
			strokeWeight(weight);
			line(this.trail[i].x, this.trail[i].y, this.trail[i + 1].x, this.trail[i + 1].y);
		}
		
		// Draw walker
		noStroke();
		fill(this.hue, 255, 255, this.alpha * 0.8);
		ellipse(this.x, this.y, this.size, this.size);
		
		// Glow effect
		fill(this.hue, 255, 255, this.alpha * 0.2);
		ellipse(this.x, this.y, this.size * 2, this.size * 2);
	}
	
	isDead() {
		return !this.alive && this.alpha <= 0;
	}
}

class Particle {
	constructor(x, y, hue) {
		this.x = x;
		this.y = y;
		this.vx = random(-3, 3);
		this.vy = random(-3, 3);
		this.size = random(2, 6);
		this.hue = hue;
		this.alpha = 255;
		this.life = 60;
	}
	
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.vx *= 0.95;
		this.vy *= 0.95;
		this.alpha -= 255 / this.life;
	}
	
	draw() {
		noStroke();
		fill(this.hue, 200, 255, this.alpha);
		ellipse(this.x, this.y, this.size, this.size);
	}
	
	isDead() {
		return this.alpha <= 0;
	}
}

let cnv;
let walkers = [];
let particles = [];
let mode = 'standard';
let wrapMode = false;
let totalSteps = 0;
let totalDistance = 0;
let hueOffset = 0;

function setup() {
	cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('game-container');
	colorMode(HSB, 360, 255, 255, 255);
	
	// Start with one walker - use orange/blue hues
	walkers.push(new Walker(width / 2, height / 2, random(15, 35)));
	
	updateWalkerCount(walkers.length);
}

function draw() {
	// Trailing effect
	fill(0, 0, 0, 30);
	noStroke();
	rect(0, 0, width, height);
	
	// Update and draw walkers
	totalSteps = 0;
	totalDistance = 0;
	let aliveCount = 0;
	
	for (let walker of walkers) {
		walker.step(mode, wrapMode, walkers);
		walker.draw();
		if (walker.alive) {
			totalSteps += walker.steps;
			totalDistance += walker.totalDistance;
			aliveCount++;
		}
	}
	
	// Remove fully faded walkers
	for (let i = walkers.length - 1; i >= 0; i--) {
		if (walkers[i].isDead()) {
			walkers.splice(i, 1);
		}
	}
	
	// Update and draw particles
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].draw();
		
		if (particles[i].isDead()) {
			particles.splice(i, 1);
		}
	}
	
	// Update UI
	updateSteps(totalSteps);
	updateDistance(totalDistance);
	updateWalkerCount(aliveCount);
	
	// Cycle hue for new walkers
	hueOffset += 0.5;
}

function mousePressed() {
	// Spawn walker at mouse position - orange/blue hues
	const newHue = (15 + (hueOffset % 40)) % 360;
	walkers.push(new Walker(mouseX, mouseY, newHue));
}

function changeMode(newMode) {
	mode = newMode;
	
	const buttons = document.querySelectorAll('.control-btn');
	buttons.forEach(btn => btn.classList.remove('active'));
	
	if (newMode === 'standard') buttons[0].classList.add('active');
	if (newMode === 'levy') buttons[1].classList.add('active');
	if (newMode === 'biased') buttons[2].classList.add('active');
}

function toggleWrap() {
	wrapMode = !wrapMode;
	const btn = document.querySelectorAll('.control-btn')[3];
	if (wrapMode) {
		btn.classList.add('active');
	} else {
		btn.classList.remove('active');
	}
}

function addWalker() {
	const newHue = (15 + (hueOffset % 40)) % 360;
	walkers.push(new Walker(random(width), random(height), newHue));
}

function resetAll() {
	walkers = [];
	particles = [];
	totalSteps = 0;
	totalDistance = 0;
	hueOffset = 0;
	
	background(0);
	
	walkers.push(new Walker(width / 2, height / 2, random(15, 35)));
	updateSteps(0);
	updateDistance(0);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

window.addEventListener('load', () => {
	document.querySelectorAll('.control-btn')[0].classList.add('active');
});
