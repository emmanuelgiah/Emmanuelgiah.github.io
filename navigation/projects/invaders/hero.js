function hero(posx) {
	this.size = 20;
	//colors
	var r = 25;
	var g = 150;
	var b = 255;
	//position
	this.x2 = windowWidth/2 - this.size;
	this.x1 = this.x2 - this.size;
	this.x3 = this.x2 + this.size;

	this.y1 = height-25;
	this.y2 = this.y1 - this.size;
	this.y3 = this.y1;
	//slow
	this.friction = 0.8;

	this.move = function(d) {
		var dir = d;
		if (dir > 0) {
			this.x1 += dir;
			this.x2 += dir;
			this.x3 += dir;
		} else {
			this.x1 += dir;
			this.x2 += dir;
			this.x3 += dir;
		}
	}

	this.draw = function() {
		fill(r, g, b);
		triangle(this.x1, this.y1, this.x2, this.y2, this.x3,this.y3);
	}
}