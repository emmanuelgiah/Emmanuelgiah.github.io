function bullet(xpos, ypos) {
	this.vel = 25;
	this.x = xpos;
	this.y = ypos;

	this.fire = function() {
		this.y -= this.vel;
	}

	this.draw = function() {
		fill(50, 100, 255);
		ellipse(this.x, this.y, 5, 5);
	}
 }