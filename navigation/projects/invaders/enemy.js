function enemy(xpos, ypos, size) {
	this.x = xpos;
	this.y = ypos;
	this.s = size;
	this.vel = Math.floor(Math.random() * 4) + 1;

	this.strafe = function() {
		this.x += this.vel;
	}

	this.draw = function(){
		fill(50, 50, 100);
		rect(this.x, this.y, this.s, this.s);
	}
}