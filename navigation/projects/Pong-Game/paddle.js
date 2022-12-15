function paddle(startX, startY) {
	this.xpos = startX;
	this.ypos = startY;

	this.strafe = function(vel) {
		this.ypos += vel;
	}

	this.draw = function() {
		fill(255);
		rect(this.xpos, this.ypos, 10, 100);
	}
}