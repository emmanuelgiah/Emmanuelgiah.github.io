function ball(xpos, ypos, radius) {
    this.x = xpos;
    this.y = ypos;
    this.r = radius;
    this.vel = Math.sqrt(radius);


    this.bounce = function(player) {
        if (player == true) {
            this.move();
        }

        if (player == false) {
            this.move();
        }
    }

    this.draw = function() {
        fill(255);
        ellipse(this.x, this.y, radius, radius);
    }
}