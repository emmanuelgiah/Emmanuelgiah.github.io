var startx = 0;
var starty = 0;
var speed;
var speedSlider;

var points = new Array();

function setup() {
	createCanvas(windowWidth-20, windowHeight-20);
	startx = width/2;
	starty = height/2;
	speed = document.querySelector("input").value;
	background(0);
}

function draw() {
	speed = document.querySelector("input").value;
	var distx = (Math.random() * (speed * 2)) - speed;
	var disty = (Math.random() * (speed * 2)) - speed;

	var newx = startx + distx;
	var newy = starty + disty;

	if (newx > 0 && newx < width && newy > 0 && newy < height) {
		stroke(255, 255, 255, 100);
		line(startx, starty, newx, newy);
		startx = newx;
		starty = newy;
	} else {
		strokeWeight(5);
		stroke(0, 0, 255);
		var trailLength = 20;
		
		for (var i = 0; i < points.length-trailLength; i+=trailLength) {
			var trax = points[i][0];
			var tray = points[i][1];

			var newtrax = points[i+trailLength][0];
			var newtray = points[i+trailLength][1];

			line(trax, tray, newtrax, newtray);
		}

		noLoop();
	}

	points.push([newx, newy]);
}

function windowResized() {
	resizeCanvas(windowWidth-20, windowHeight-20);
}