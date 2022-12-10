var startx = 0;
var starty = 0;
var speed;
var speedSlider;
var lineStrokeA;
var lineStrokeB;
var points = new Array();

function setup() {
	createCanvas(windowWidth-10, windowHeight-20);
	startx = width/2;
	starty = height/2;
	lineStrokeA = random(100);
	lineStrokeB = random(100);
	
	speed = 20;
}

function draw() {
	var distx = (Math.random() * (speed * 2)) - speed;
	var disty = (Math.random() * (speed * 2)) - speed;

	var newx = startx + distx;
	var newy = starty + disty;

	if (newx > 0 && newx < width && newy > 0 && newy < height) {
		strokeWeight(4);
		stroke(255, 255, 255, 50);
		line(startx, starty, newx, newy);
		startx = newx;
		starty = newy;
	} else {
		background(0)
		var trailLength = Math.floor(points.length/30);
		let red = Math.floor(Math.random() * 100);
		let green = Math.floor(Math.random() * 100);
		for (var i = 0; i < points.length; i+=trailLength) {
			var trax = points[i][0];
			var tray = points[i][1];

			var newtrax = points[i+trailLength][0];
			var newtray = points[i+trailLength][1];

			gradientLine(trax, tray, newtrax, newtray, color(red+i, green, lineStrokeA), color(red+i, green, lineStrokeB), 2);
		}
		noLoop();
	}

	points.push([newx, newy]);
}

function gradientLine(x1, y1, x2, y2, c1, c2, sz) {
	const d = dist(x1, y1, x2, y2)
	for (let i = 0; i < d; i++) {
	  const step = map(i, 0, d, 0, 1)
	  const x = lerp(x1, x2, step)
	  const y = lerp(y1, y2, step)
	  const c = lerpColor(c1, c2, step)
	  fill(c)
	  noStroke()
	  ellipse(x, y, sz, sz)
	}
}

function mousePressed() {
	//reset cache
	document.body.style.background = "rgba(" + 0 + ", " + 0 + ", " + 0 + ", 1)";
	lineStrokeA = random(100);
	lineStrokeB = random(100);
	startx = mouseX;
	starty = mouseY;
	speed = 25;
}

function windowResized() {
	resizeCanvas(windowWidth-20, windowHeight-20);
}
