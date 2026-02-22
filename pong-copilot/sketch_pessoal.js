// ===============================
// PONG FUTURISTA - VERSÃO VISUAL
// ===============================

let ball;
let leftPaddle;
let rightPaddle;

let leftScore = 0;
let rightScore = 0;

let beep;

let bolaImagem;
let barraEsquerdaImagem;
let barraDireitaImagem;

let backgroundImagem1;
let backgroundImagem2;
let currentBackground;

// ===============================
// CLASSE BALL
// ===============================

class Ball {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.resetSpeed();
  }

  resetSpeed() {
    this.speedX = random([-6, 6]);
    this.speedY = random(-4, 4);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebater topo e base
    if (this.y < this.size / 2 || this.y > height - this.size / 2) {
      this.speedY *= -1;
    }
  }

  draw() {
    imageMode(CENTER);
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = "#00ffff";
    image(bolaImagem, this.x, this.y, this.size, this.size);
    drawingContext.shadowBlur = 0;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.resetSpeed();
  }
}

// ===============================
// CLASSE PADDLE
// ===============================

class Paddle {
  constructor(x, w, h, img, isPlayer = false) {
    this.x = x;
    this.y = height / 2 - h / 2;
    this.w = w;
    this.h = h;
    this.img = img;
    this.isPlayer = isPlayer;
  }

  move(ballY = null) {
    if (this.isPlayer) {
      this.y = constrain(mouseY - this.h / 2, 0, height - this.h);
    } else {
      // IA mais suave
      let target = ballY - this.h / 2;
      this.y += (target - this.y) * 0.08;
      this.y = constrain(this.y, 0, height - this.h);
    }
  }

  draw() {
    imageMode(CORNER);
    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = "#ffaa00";
    image(this.img, this.x, this.y, this.w, this.h);
    drawingContext.shadowBlur = 0;
  }

  checkCollision(ball) {
    if (
      ball.x - ball.size / 2 < this.x + this.w &&
      ball.x + ball.size / 2 > this.x &&
      ball.y > this.y &&
      ball.y < this.y + this.h
    ) {
      ball.speedX *= -1;

      // Efeito de ângulo dinâmico
      let hitPoint = ball.y - (this.y + this.h / 2);
      ball.speedY = hitPoint * 0.2;

      playBeep();
    }
  }
}

// ===============================
// PRELOAD
// ===============================

function preload() {
  bolaImagem = loadImage("bola.png");
  barraEsquerdaImagem = loadImage("barra01.png");
  barraDireitaImagem = loadImage("barra02.png");

  backgroundImagem1 = loadImage("fundo1.png");
  backgroundImagem2 = loadImage("fundo2.png");

  beep = new p5.Oscillator("sine");
  beep.start();
  beep.amp(0);
}

// ===============================
// SETUP
// ===============================

function setup() {
  createCanvas(900, 500);

  // Escolhe fundo aleatório
  currentBackground = random([backgroundImagem1, backgroundImagem2]);

  ball = new Ball(width / 2, height / 2, 40);

  leftPaddle = new Paddle(30, 25, 140, barraEsquerdaImagem, true);
  rightPaddle = new Paddle(width - 55, 25, 140, barraDireitaImagem, false);
}

// ===============================
// DRAW
// ===============================

function draw() {
  drawBackground();

  leftPaddle.move();
  rightPaddle.move(ball.y);

  ball.move();

  leftPaddle.checkCollision(ball);
  rightPaddle.checkCollision(ball);

  leftPaddle.draw();
  rightPaddle.draw();
  ball.draw();

  checkScore();
  displayScore();
}

// ===============================
// FUNDO COM EFEITO
// ===============================

function drawBackground() {
  imageMode(CORNER);
  image(currentBackground, 0, 0, width, height);

  // Linha central glow
  stroke(0, 255, 255, 120);
  strokeWeight(3);
  line(width / 2, 0, width / 2, height);
}

// ===============================
// PLACAR
// ===============================

function displayScore() {
  textAlign(CENTER, TOP);
  textSize(48);
  fill(255);
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "#00ffff";
  text(leftScore, width / 4, 20);
  text(rightScore, (3 * width) / 4, 20);
  drawingContext.shadowBlur = 0;
}

// ===============================
// PONTUAÇÃO
// ===============================

function checkScore() {
  if (ball.x < 0) {
    rightScore++;
    ball.reset();
  }

  if (ball.x > width) {
    leftScore++;
    ball.reset();
  }
}

// ===============================
// SOM
// ===============================

function playBeep() {
  beep.freq(700);
  beep.amp(0.4, 0.05);
  setTimeout(() => beep.amp(0, 0.2), 100);
}