function particle (xpos, ypos, sizeRange, r, b) {
	this.x = xpos;
	this.y = ypos;
	this.xv = Math.floor(Math.random() * 20) - 10;
	this.yv = Math.floor(Math.random() * 20) - 10;
	this.s = Math.floor(Math.random() * sizeRange) + 1;

	//color
	this.r = r;
	this.g = 60;
	this.b = b;
	this.opacity = Math.random() * 1;

	this.update = function() {
		this.x += this.xv;
		this.y += this.yv;

		this.xv *= .95;
		this.yv *= .95;
		this.opacity -= .01;
	}

	this.draw = function() {
		noStroke();
		fill("rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.opacity + ")");
		ellipse(this.x, this.y, this.s, this.s);
	}
}