// Enemy class for Space Invaders
class Enemy {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.s = size;
		this.vel = Math.floor(Math.random() * 4) + 1;
	}

	strafe() {
		this.x += this.vel;
	}

	draw() {
		fill(35, 40, 75);
		stroke(255, 0, 0);
		strokeWeight(3);
		rect(this.x, this.y, this.s, this.s);
	}

	isOffScreen(canvasWidth, canvasHeight) {
		return this.x >= canvasWidth + 50 || this.y >= canvasHeight;
	}

	reset(canvasWidth, canvasHeight) {
		if (this.x >= canvasWidth + 50) {
			this.x = -50;
			this.y += canvasHeight / 10;
			this.vel += this.vel / 10;
		} else if (this.y >= canvasHeight) {
			this.x = -50;
			this.y = canvasHeight / 10;
			this.vel += this.vel / 10;
		}
	}

	collidesWith(hero) {
		const sizeFactor = this.s / 2;
		const distance = dist(hero.x2, hero.y2, this.x + sizeFactor, this.y + sizeFactor);
		return distance <= hero.size / 2;
	}
}
