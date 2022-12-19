function ball(xpos, ypos, radius) {
    this.x = xpos;
    this.y = ypos;
    this.r = radius;
    this.vel = Math.sqrt(radius);

    this.bounce = function(directional) {
		console.log("Omnidirectional: " + directional);
		this.x += directional;

        if (this.x > width-20) {
            this.bounce(-directional);
        }
	}

    this.draw = function() {
        fill(255);
        stroke(0);
        strokeWeight(3);
        ellipse(this.x, this.y, radius, radius);
    }
}