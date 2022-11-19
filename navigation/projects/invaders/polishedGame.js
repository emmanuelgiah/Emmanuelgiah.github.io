var cnv;
var h;
var vel = 0;
var bullets = [];
var badguys = [];
var particles = [];
var totalBadguys = 2;
var currentLevel = 1;
var currentScore = 0;
//sounds
/*var enemyImpact;
var firing;*/

/*TODO
	- Day mode. Night Mode.
*/

function preload() {
	soundFormats('mp3', 'wav', 'ogg');
	// enemyImpact = loadSound('sounds/shortImpact.wav');
}

function setup() {
	cnv = createCanvas(windowWidth-100, windowHeight-100);
	cnv.position(50, 50);
	h = new hero();
	createEnemies(totalBadguys);
	frameRate(60);
}

function draw() {
	stroke(255);
	strokeWeight(3);
	background("rgba(" + 25 + ", " + 25 + ", " + 25 + ", .5)");

	h.move(vel);
	h.draw();
	//movement
	if (keyIsPressed) {
		if (keyCode === LEFT_ARROW) {
			vel = -(width/250);
		} else if (keyCode === RIGHT_ARROW) {
			vel = (width/250);
		}
	}
	
	//screen looping
	if (h.x1 < 0 - (h.size * 2)) {
		h.x1 = width+1;
		h.x2 = h.x1 + h.size;
		h.x3 = h.x2 + h.size;
	} else if (h.x1 > width+1) {
		h.x3 = 0;
		h.x2 = h.x3 - h.size;
		h.x1 = h.x2 - h.size;
	}
	//show bullets
	noStroke();
	for (var i = 0; i < bullets.length; i++) {
		if (i == bullets.length - 1 && bullets[i].y < -10) {
			bullets.splice(i, 1);
		} else {
			bullets[i].fire();
			bullets[i].draw();
		}
	}
	//show baddies
	stroke(255, 0, 0);
	for (var i = badguys.length-1; i >= 0; i--) {
		if (badguys[i].x >= (width+45)) {
			badguys[i].x = 0-45;
			badguys[i].y += height/11;
			badguys[i].vel += (badguys[i].vel / 11);

			badguys[i].strafe();
			badguys[i].draw();
		} else {
			badguys[i].strafe();
			badguys[i].draw();
		}
	}
	//checks hits
	for (var i = bullets.length-1; i >= 0; i--) {
		var blx = bullets[i].x;
		var bly = bullets[i].y;

		for (var q = badguys.length-1; q >= 0; q--) {
			var bgx = badguys[q].x;
			var bgy = badguys[q].y;
			var bgs = badguys[q].s/2;

			var dis = dist(blx, bly, bgx + bgs, bgy + bgs);
			if (dis <= bgs) {
				currentScore++;
				var numParticles = Math.floor(Math.random() * 20) + 1;
				for (var z = 0; z <= numParticles; z++) {
					var p = new particle(bgx, bgy, badguys[q].s/2, 200, 80);
					console.log(p);
					particles.push(p);
					if (z % 2 == 0) {
						particles.push(new particle(bgx, bgy, 10/4, 80, 200))
					}
				}
				bullets.splice(i, 1);
				badguys.splice(q, 1);
				// enemyImpact.play();
				dis = 0;
			}
		}
	}
	//shows particles 
	for (var q = particles.length-1; q >= 0; q--) {
		if (particles[q].opacity <= 0.1) {
			particles.splice(q, 1);
		} else {
			particles[q].update();
			particles[q].draw();
		}
	}

	//checks if enemies
	if (badguys.length == 0) {
		alert("Starting New Round: " + currentLevel + "\nCurrent Score: " + currentScore);
		currentLevel++;
		totalBadguys += 10;
		createEnemies(totalBadguys);
	}
	
	//slows down the movement
	vel *= 0.88;
}

function windowResized() {
	resizeCanvas(windowWidth-100, windowHeight-100);
	//scales the position of our hero
	h.x2 = windowWidth/2 - h.size;
	h.x1 = h.x2 - h.size;
	h.x3 = h.x2 + h.size;
	//scales the y position of our hero
	h.y1 = height-25;
	h.y2 = h.y1 - h.size;
	h.y3 = h.y1;
}

function keyReleased() {
	//firing
	if (keyCode === 32 || keyCode === UP_ARROW) {
		bullets.push(new bullet(h.x2, h.y2));
		// firing.play();
	}
}

function createEnemies(num) {
	//position of bad guys
	var ypos = height/13;
	var xpos = (Math.random() * 20);
	//generates new baddies
	for (var i = 1; i <= num; i++) {
		if (i % 5 == 0) {
			//creates a new row of badguys
			ypos += height/(num + 1);
			xpos = 1;
			badguys.push(new enemy(0 + (width/(Math.random() * 20) * xpos), ypos, height/num));
		} else {
			badguys.push(new enemy(0 + (width/(Math.random() * 20)  * xpos), ypos, height/num));
		}
		xpos++;
	}
}