function paddle(startX, startY, paddleSize) {
	this.xpos = startX;
	this.ypos = startY;
	this.size = paddleSize;
	//dynamic movement function
	this.strafe = function(directional) {
		console.log(directional);
		if (directional == 40) {
			this.ypos += (directional/5);
		} else if (directional == 38) {
			this.ypos -= (directional/5);
		}
	}
	//render paddle
	this.draw = function() {
		fill(255);
		stroke(0);
		strokeWeight(3);
		rect(this.xpos, this.ypos, (paddleSize*.1), paddleSize);
	}
}