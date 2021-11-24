let rcolorScale = Math.floor(Math.random() * 50);
let gcolorScale = Math.floor(Math.random() * 50);
let bcolorScale = Math.floor(Math.random() * 50);
let organism;

function setup() {
	createCanvas(windowWidth-19.500008, windowHeight-19.50008);
	r = rcolorScale;
	g = gcolorScale;
	b = bcolorScale;

	organism = new particle(width/2, height/2, 25);
	document.body.style.background = "rgba(" + r + ", " + g + ", " + b + ", .9)";
}

function draw() {
	noStroke();
	fill("rgba(" + r + ", " + g + ", " + b + ", .9)");
	rect(0, 0, window.width-5, window.height-5);
	fill("rgba(" + r + ", " + g + ", " + b + ", .9)");
	organism.update();
	organism.draw();
}

function windowResized() {
	resizeCanvas(windowWidth-19.50008, windowHeight-19.50008);
}