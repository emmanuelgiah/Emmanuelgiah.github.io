// Paddle class for Pong game
class Paddle {
	constructor(x, y, isUser) {
		this.x = x;
		this.y = y;
		this.targetY = y;
		this.width = 12;
		this.height = 120;
		this.speed = 8;
		this.isUser = isUser;
		this.easing = 0.15; // Easing factor for smooth movement
	}

	update() {
		if (!this.isUser) return;
		
		// Arrow key controls - set target position
		if (keyIsDown(UP_ARROW)) {
			this.targetY -= this.speed;
		}
		if (keyIsDown(DOWN_ARROW)) {
			this.targetY += this.speed;
		}
		
		// Constrain target to canvas
		this.targetY = constrain(this.targetY, 0, height - this.height);
		
		// Smooth easing to target position
		const diff = this.targetY - this.y;
		this.y += diff * this.easing;
	}

	followBall(ball) {
		if (this.isUser) return;
		
		// AI follows ball with slight delay
		const targetY = ball.y - this.height / 2;
		const diff = targetY - this.y;
		this.y += diff * 0.08;
		
		// Constrain to canvas
		this.y = constrain(this.y, 0, height - this.height);
	}

	draw() {
		// Subtle glow effect
		noStroke();
		fill(255, 100, 200, 15);
		rect(this.x - 3, this.y - 3, this.width + 6, this.height + 6, 4);
		
		fill(255, 100, 200, 30);
		rect(this.x - 1, this.y - 1, this.width + 2, this.height + 2, 3);
		
		// Paddle
		fill(255, 255, 255, 255);
		rect(this.x, this.y, this.width, this.height, 2);
	}
}
