// Space Invaders Game - Refactored
const CANVAS_PADDING = 50;
const FRAME_RATE = 120;
const VELOCITY_DECAY = 0.88;
const PARTICLE_COUNT_RANGE = 20;
const ENEMY_ROWS = 5;
const ENEMY_COLS = 10;
const VERTICAL_SPACING = 60;

let cnv;
let h;
let velocity = 0;
let bullets = [];
let enemies = [];
let particles = [];
let enemyCount = 20;
let currentLevel = 1;
let currentScore = 0;

function setup() {
	cnv = createCanvas(windowWidth - 200, windowHeight - 200);
	cnv.parent('game-container');
	h = new Hero();
	createEnemies(enemyCount);
	frameRate(FRAME_RATE);
	
	// Initialize UI
	updateScore(currentScore);
	updateLevel(currentLevel);
}

function draw() {
	// Trailing effect - semi-transparent background
	fill(25, 25, 25, 80);
	noStroke();
	rect(0, 0, width, height);
	
	updateHero();
	updateBullets();
	updateEnemies();
	updateParticles();
	checkCollisions();
	checkLevelComplete();
}

function updateHero() {
	if (!h) return;
	
	h.move(velocity);
	h.draw();
	
	// Handle keyboard input
	if (keyIsPressed) {
		if (keyCode === LEFT_ARROW) {
			velocity = -(width / 250);
		} else if (keyCode === RIGHT_ARROW) {
			velocity = width / 250;
		}
	}
	
	// Screen wrapping
	if (h.x1 < -(h.size * 2)) {
		h.x1 = width + 1;
		h.x2 = h.x1 + h.size;
		h.x3 = h.x2 + h.size;
	} else if (h.x1 > width + 1) {
		h.x3 = 0;
		h.x2 = h.x3 - h.size;
		h.x1 = h.x2 - h.size;
	}
	
	velocity *= VELOCITY_DECAY;
}

function updateBullets() {
	noStroke();
	for (let i = bullets.length - 1; i >= 0; i--) {
		if (bullets[i].isOffScreen()) {
			bullets.splice(i, 1);
		} else {
			bullets[i].fire();
			bullets[i].draw();
		}
	}
}

function updateEnemies() {
	for (let i = enemies.length - 1; i >= 0; i--) {
		const enemy = enemies[i];
		
		// Check if enemy reached bottom
		if (enemy.y >= height - enemy.s) {
			gameOver();
			return;
		}
		
		// Screen wrapping
		if (enemy.x >= width + 50) {
			enemy.x = -50;
			enemy.y += VERTICAL_SPACING;
			enemy.vel += enemy.vel / 10;
		}
		
		enemy.strafe();
		enemy.draw();
		
		// Check hero collision only if hero exists
		if (h && enemy.collidesWith(h)) {
			gameOver();
			return;
		}
	}
}

function updateParticles() {
	for (let i = particles.length - 1; i >= 0; i--) {
		if (particles[i].isDead()) {
			particles.splice(i, 1);
		} else {
			particles[i].update();
			particles[i].draw();
		}
	}
}

function checkCollisions() {
	for (let i = bullets.length - 1; i >= 0; i--) {
		const bullet = bullets[i];
		
		for (let j = enemies.length - 1; j >= 0; j--) {
			const enemy = enemies[j];
			const enemyCenter = { x: enemy.x + enemy.s / 2, y: enemy.y + enemy.s / 2 };
			const distance = dist(bullet.x, bullet.y, enemyCenter.x, enemyCenter.y);
			
			if (distance <= enemy.s / 2) {
				createExplosion(enemy.x, enemy.y, enemy.s);
				bullets.splice(i, 1);
				enemies.splice(j, 1);
				currentScore++;
				updateScore(currentScore);
				console.log(`Score: ${currentScore}`);
				break;
			}
		}
	}
}

function createExplosion(x, y, size) {
	const numParticles = Math.floor(Math.random() * PARTICLE_COUNT_RANGE) + 1;
	
	for (let i = 0; i <= numParticles; i++) {
		particles.push(new Particle(x, y, size / 2, 150, 50));
		if (i % 2 === 0) {
			particles.push(new Particle(x, y, 10 / 4, 50, 150));
		}
	}
}

function checkLevelComplete() {
	if (enemies.length === 0) {
		showLevelComplete(currentLevel, currentScore);
		currentLevel++;
		updateLevel(currentLevel);
		enemyCount += 10;
		
		window.continueGame = function() {
			createEnemies(enemyCount);
			loop();
		};
		
		noLoop();
	}
}

function gameOver() {
	// Create hero explosion at hero position
	createHeroExplosion(h.x2, h.y2, h.size);
	
	// Hide hero immediately
	h = null;
	
	// Wait for explosion animation to complete before showing game over
	setTimeout(() => {
		showGameOver(currentScore, currentLevel);
		noLoop();
	}, 1500);
}

function createHeroExplosion(x, y, size) {
	// Create more dramatic explosion with more particles
	const numParticles = 50;
	
	for (let i = 0; i < numParticles; i++) {
		// Mix of cyan and blue particles matching hero colors
		if (i % 3 === 0) {
			particles.push(new Particle(x, y, size, 25, 150)); // Cyan
		} else if (i % 3 === 1) {
			particles.push(new Particle(x, y, size / 2, 100, 200)); // Light blue
		} else {
			particles.push(new Particle(x, y, size / 3, 50, 255)); // Bright blue
		}
	}
}

function createEnemies(count) {
	enemies = [];
	
	// Calculate enemy size and spacing
	const enemySize = 40;
	const cols = Math.min(ENEMY_COLS, count);
	const rows = Math.ceil(count / cols);
	
	// Calculate horizontal spacing to fit all enemies
	const totalWidth = width * 0.8; // Use 80% of canvas width
	const horizontalSpacing = totalWidth / cols;
	const startX = (width - totalWidth) / 2;
	const startY = 50;
	
	let enemyIndex = 0;
	
	for (let row = 0; row < rows && enemyIndex < count; row++) {
		for (let col = 0; col < cols && enemyIndex < count; col++) {
			const x = startX + col * horizontalSpacing;
			const y = startY + row * VERTICAL_SPACING;
			
			enemies.push(new Enemy(x, y, enemySize));
			enemyIndex++;
		}
	}
}

function keyReleased() {
	if (h && (keyCode === 32 || keyCode === UP_ARROW)) {
		bullets.push(new Bullet(h.x2, h.y2));
	}
}

function windowResized() {
	resizeCanvas(windowWidth - 200, windowHeight - 200);
	if (h) {
		h.updatePosition(width, height);
	}
}
