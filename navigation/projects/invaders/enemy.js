function enemy(xpos, ypos, size) {
	this.x = xpos;
	this.y = ypos;
	this.s = size;
	this.vel = Math.floor(Math.random() * 4) + 1;

	this.strafe = function() {
		this.x += this.vel;
	}

	this.draw = function(){
		fill(35, 40, 75);
		rect(this.x, this.y, this.s, this.s);
	}
}