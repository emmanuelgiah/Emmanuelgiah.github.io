function paddle(startX, startY) {
	this.xpos = startX;
	this.ypos = startY;
	this.friction = 0.8;

	this.strafe = function(vel) {
		this.ypos += vel;
	}

	this.strafe = function(d) {
		var dir = d;
		if (dir > 0) {
			this.ypos += dir;
		} else {
			this.ypos -= dir;
		}
	}


	this.draw = function() {
		fill(255);
		rect(this.xpos, this.ypos, 10, 100);
	}
}