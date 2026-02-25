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
		// Rectangle-to-triangle collision detection
		// Enemy is a rectangle: (this.x, this.y) to (this.x + this.s, this.y + this.s)
		// Hero is a triangle with vertices: (x1, y1), (x2, y2), (x3, y3)
		
		// First check: simple bounding box overlap
		const heroLeft = hero.x1;
		const heroRight = hero.x3;
		const heroTop = hero.y2;
		const heroBottom = hero.y1;
		
		const enemyLeft = this.x;
		const enemyRight = this.x + this.s;
		const enemyTop = this.y;
		const enemyBottom = this.y + this.s;
		
		// If bounding boxes don't overlap, no collision
		if (enemyRight < heroLeft || enemyLeft > heroRight ||
		    enemyBottom < heroTop || enemyTop > heroBottom) {
			return false;
		}
		
		// If bounding boxes overlap, check if any corner of the enemy box
		// is inside the triangle or if the enemy box intersects triangle edges
		
		// Check if enemy bottom edge overlaps with triangle
		// The triangle's top point is at y2, bottom is at y1
		// If enemy bottom is below the triangle top, there's potential collision
		if (enemyBottom >= heroTop) {
			// Check horizontal overlap with more precision
			// The triangle gets wider as it goes down
			const enemyMidX = this.x + this.s / 2;
			const heroMidX = hero.x2;
			
			// Calculate triangle width at the enemy's y position
			const triangleHeight = hero.y1 - hero.y2;
			const triangleBaseWidth = hero.x3 - hero.x1;
			
			// For each y level of the enemy box, check if it overlaps with triangle
			const checkY = Math.max(enemyTop, heroTop);
			const yRatio = (checkY - heroTop) / triangleHeight;
			const triangleWidthAtY = triangleBaseWidth * yRatio;
			const triangleLeftAtY = heroMidX - triangleWidthAtY / 2;
			const triangleRightAtY = heroMidX + triangleWidthAtY / 2;
			
			// Check if enemy box overlaps with triangle at this y level
			if (enemyRight >= triangleLeftAtY && enemyLeft <= triangleRightAtY) {
				return true;
			}
		}
		
		return false;
	}
}
