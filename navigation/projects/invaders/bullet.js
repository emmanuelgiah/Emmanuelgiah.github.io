// Bullet class for Space Invaders
class Bullet {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.vel = 25;
		this.size = 5;
	}

	fire() {
		this.y -= this.vel;
	}

	draw() {
		fill(50, 100, 255);
		noStroke();
		ellipse(this.x, this.y, this.size, this.size);
	}

	isOffScreen() {
		return this.y < -10;
	}
}
