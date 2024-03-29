let particles;
let rcolorScale = Math.floor(Math.random() * 50);
let gcolorScale = Math.floor(Math.random() * 50);
let bcolorScale = Math.floor(Math.random() * 50);

let r;
let g;
let b;

let xpolosionfactor = 0;
let ypolosionfactor = 0;
let hasExploded = false;

function setup() {
	createCanvas(windowWidth-10, windowHeight-20);
	particles = [];

	translate(windowWidth/2, windowHeight/2);
	for (let i = 0; i < 100; i++) {
		particles.push(new particle(windowWidth/2, windowHeight/2, 8))
	}

	r = rcolorScale;
	g = gcolorScale;
	b = bcolorScale;

	document.body.style.background = "rgba(" + r + ", " + g + ", " + b + ", 1)";
}

function draw() {
	noStroke();
	fill("rgba(" + r + ", " + g + ", " + b + ", 1)");
	rect(0, 0, window.width, window.height);
	fill("rgba(" + r + ", " + g + ", " + b + ", .5)");
	//corner check
	for (var i = 0; i < particles.length; i++) {
		//checks if in orbit
		if ((particles[i].x < 0) ||
			(particles[i].x > width+10) ||
			(particles[i].y < 0) ||
			(particles[i].y > height+10)) {
			particles[i].exploding = false;
			particles[i].searching = true;
		}
		//checks if in orbit
		if ((dist(particles[i].x, mouseY, mouseX, mouseY) <= particles[i].xdistance) ||
			(dist(mouseX, particles[i].y, mouseX, mouseY) <= particles[i].ydistance)) {
			particles[i].searching = false;
		}
	}
	
	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw();
	}
}

function windowResized() {
	resizeCanvas(windowWidth-19.50008, windowHeight-19.50008);
	particles = [];
	for (let i = 0; i < 100; i++) {
		particles.push(new particle(mouseX, mouseY, 7))
	}

}

function mouseWheel(event) {
	for (let i = 0; i < particles.length; i++) {
		particles[i].xdistance += (event.delta/25);
		particles[i].ydistance += (event.delta/25);
	}
}

function mousePressed() {
	//explosion check
	if (mouseButton == LEFT) {
		for (var i = 0; i < particles.length; i++) {
			if (particles[i].exploding == true) {
				particles[i].exploding = false;
				particles[i].searching = false;
			} else {
				particles[i].exploding = true;
			}
		}
	} else  {
		for (var i = 0; i < particles.length; i++) {
			if (particles[i].orbitLock == true) {
				particles[i].searching = true;
				particles[i].orbitLock = false;
			} else {
				particles[i].orbitX = mouseX;
				particles[i].orbitY = mouseY;
				particles[i].searching = false;
				particles[i].orbitLock = true;
				
			}
		}
	}
}

function touchStarted() {
	for (var i = 0; i < particles.length; i++) {
		if (particles[i].exploding == true) {
			particles[i].exploding = false;
			particles[i].searching = false;
		} else {
			particles[i].exploding = true;
		}
	}
	console.log("Touched.");
}