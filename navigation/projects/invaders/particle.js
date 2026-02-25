// Particle class for explosion effects
class Particle {
	constructor(x, y, sizeRange, r, b) {
		this.x = x;
		this.y = y;
		this.xv = Math.floor(Math.random() * 20) - 10;
		this.yv = Math.floor(Math.random() * 20) - 10;
		this.s = Math.floor(Math.random() * sizeRange) + 1;
		
		// Color
		this.r = r;
		this.g = 40;
		this.b = b;
		this.opacity = Math.random();
	}

	update() {
		this.x += this.xv;
		this.y += this.yv;
		
		this.xv *= 0.95;
		this.yv *= 0.95;
		this.opacity -= 0.01;
	}

	draw() {
		noStroke();
		fill(`rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`);
		ellipse(this.x, this.y, this.s, this.s);
	}

	isDead() {
		return this.opacity <= 0.1;
	}
}
