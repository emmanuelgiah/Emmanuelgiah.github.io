function bullet(xpos, ypos) {
	this.vel = 25;
	this.x = xpos;
	this.y = ypos;

	this.fire = function() {
		this.y -= this.vel;
	}

	this.draw = function() {
		fill(100, 100, 240);
		ellipse(this.x, this.y, 10, 10);
	}
}