function particle(x, y, radius) {
	//instance valuables
	this.x = x;
	this.y = y;
	this.r = radius;
	this.gr = Math.floor(Math.random() * 255) + 100;
	//maths for rotation
	this.radians = Math.random() * Math.PI * 2;
	this.scale = 2;
	this.xdistance = Math.floor(Math.random() * (Math.pow(this.r, this.scale))) + (Math.pow(this.r, this.scale));
	this.ydistance = Math.floor(Math.random() * (Math.pow(this.r, this.scale))) + (Math.pow(this.r, this.scale));
	//saves original circumference
	this.origxdistance = this.xdistance;
	this.origydistance = this.ydistance;
	this.velocity = 0.1;
	//boolean values
	this.searching = false;
	this.exploding = false;
	this.orbitLock = false;
	
	this.orbitX = this.x;
	this.orbitY = this.y;

	this.update = function() {
		lastPoint = {x: this.x, y: this.y};
		//move points over time
		this.radians += this.velocity;

		if (this.orbitLock) {
			this.x = (this.orbitX + Math.cos(this.radians) * this.xdistance);
			this.y = (this.orbitY + Math.sin(this.radians) * this.ydistance);
		} else if (this.searching) {
			this.trace();
		} else if (this.exploding) {
			this.explode();
		} else {
			this.x = (mouseX + Math.cos(this.radians) * this.xdistance);
			this.y = (mouseY + Math.sin(this.radians) * this.ydistance);
		}
		
		this.draw();
	}
	//push the particle distant
	this.explode = function() {
		var xslope = 0;
		var yslope = 0;

		if (this.orbitLock) {
			xslope = (this.orbitX + Math.cos(this.radians) * this.xdistance) - this.x;
			yslope = (this.orbitY + Math.sin(this.radians) * this.ydistance) - this.y;
		} else {
			xslope = (mouseX + Math.cos(this.radians) * this.xdistance) - this.x;
		    yslope = (mouseY + Math.sin(this.radians) * this.ydistance) - this.y;
		}


		var xplosionfactor = -(xslope);
		var yplosionfactor = -(yslope);

		this.x += xplosionfactor*(this.velocity/1.5);
		this.y += yplosionfactor*(this.velocity/1.5);
	}
	//get back to the mouse
	this.trace = function() {
		var xslope = 0;
		var yslope = 0;

		if (this.orbitLock) {
			xslope = (this.orbitX + Math.cos(this.radians) * this.xdistance) - this.x;
			yslope = (this.orbitY + Math.sin(this.radians) * this.ydistance) - this.y;
		} else {
			xslope = (mouseX + Math.cos(this.radians) * this.xdistance) - this.x;
		    yslope = (mouseY + Math.sin(this.radians) * this.ydistance) - this.y;
		}

		this.x += xslope*(this.velocity/6);
		this.y += yslope*(this.velocity/6);
	}
	this.draw = function() {
		stroke('rgba(' + this.gr + ', ' + 
			this.gr + ', ' + this.gr + ', 1)');
		strokeWeight(this.r);
		line(this.x, this.y, this.x, this.y)
	}
}