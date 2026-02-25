// Hero class for Space Invaders
class Hero {
	constructor() {
		this.size = 30;
		this.color = { r: 25, g: 150, b: 255 };
		
		// Position
		this.x2 = windowWidth / 2 - this.size;
		this.x1 = this.x2 - this.size;
		this.x3 = this.x2 + this.size;
		
		this.y1 = height - 25;
		this.y2 = this.y1 - this.size;
		this.y3 = this.y1;
	}

	move(velocity) {
		this.x1 += velocity;
		this.x2 += velocity;
		this.x3 += velocity;
	}

	draw() {
		fill(this.color.r, this.color.g, this.color.b);
		stroke(255);
		strokeWeight(3);
		triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
	}

	updatePosition(canvasWidth, canvasHeight) {
		this.x2 = canvasWidth / 2 - this.size;
		this.x1 = this.x2 - this.size;
		this.x3 = this.x2 + this.size;
		
		this.y1 = canvasHeight - 25;
		this.y2 = this.y1 - this.size;
		this.y3 = this.y1;
	}
}
