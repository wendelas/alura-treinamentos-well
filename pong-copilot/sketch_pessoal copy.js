// Jogo Pong personalizado com p5.js usando classes
// Este código implementa um jogo Pong onde o jogador controla a raquete esquerda com o mouse
// e o computador controla a raquete direita. O objetivo é rebater a bola e marcar pontos.

let ball; // Instância da bola
let leftPaddle; // Instância da raquete do jogador
let rightPaddle; // Instância da raquete do computador
let leftScore = 0; // Pontuação do jogador
let rightScore = 0; // Pontuação do computador
let beep; // Som para rebater a bola

// Classe Ball representa a bola do jogo
class Ball {
  constructor(x, y, diameter) {
    // Posição inicial da bola
    this.x = x;
    this.y = y;
    // Diâmetro da bola
    this.diameter = diameter;
    // Cor da bola
    this.color = color(random(255), random(255), random(255));
    // Inicializa a velocidade da bola
    this.resetSpeed();
  }

  // Define uma velocidade aleatória para a bola
  resetSpeed() {
    this.speedX = random([-5, 5]); // Velocidade horizontal
    this.speedY = random(-3, 3);   // Velocidade vertical
  }

  // Move a bola de acordo com sua velocidade
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Rebater nas bordas superior/inferior
    if (this.y < this.diameter / 2 || this.y > height - this.diameter / 2) {
      this.speedY *= -1; // Inverte a direção vertical
      this.color = color(random(255), random(255), random(255)); // Muda a cor
    }
  }

  // Desenha a bola na tela
  draw() {
    //Image(bolaImagem, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter);
    fill(this.color);
    ellipse(this.x, this.y, this.diameter);
  }

  // Reinicia a bola no centro da tela com nova cor e velocidade
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.color = color(random(255), random(255), random(255));
    this.resetSpeed();
  }
}

// Classe Paddle representa uma raquete
class Paddle {
  constructor(x, y, w, h, isPlayer = false) {
    // Posição e tamanho da raquete
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // Define se é controlada pelo jogador
    this.isPlayer = isPlayer;
    // Cor da raquete
    this.color = isPlayer ? color(0, 255, 150) : color(255, 100, 0);
  }

  // Move a raquete
  move(ballY = null) {
    if (this.isPlayer) {
      // Raquete do jogador segue o mouse
      this.y = constrain(mouseY - this.h / 2, 0, height - this.h);
    } else if (ballY !== null) {
      // Raquete do computador segue a bola
      if (ballY > this.y + this.h / 2) this.y += 4;
      else if (ballY < this.y + this.h / 2) this.y -= 4;
      this.y = constrain(this.y, 0, height - this.h);
    }
  }

  // Desenha a raquete na tela
  draw() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
  }

  // Verifica colisão com a bola
  checkCollision(ball) {
    // Verifica se a bola está tocando a raquete
    if (
      ball.x - ball.diameter / 2 < this.x + this.w &&
      ball.x + ball.diameter / 2 > this.x &&
      ball.y > this.y &&
      ball.y < this.y + this.h
    ) {
      ball.speedX *= -1; // Inverte a direção horizontal da bola
      ball.color = color(random(255), random(255), random(255)); // Muda a cor da bola
      // Ajusta posição para evitar múltiplos rebotes
      if (this.isPlayer) {
        ball.x = this.x + this.w + ball.diameter / 2;
        playBeep(); // Toca o som ao rebater
      } else {
        ball.x = this.x - ball.diameter / 2;
        playBeep(); // Toca o som ao rebater
      }
      return true;
    }
    return false;
  }
}

// Carrega o som e imagens antes de iniciar o jogo
function preload() {
  bolaImagem = loadImage('bola.png'); // Carrega a imagem da bola
  barraEsquerdaImagem = loadImage('barra01.png'); // Carrega a imagem da raquete esquerda
  barraDireitaImagem = loadImage('barra02.png'); // Carrega a imagem da raquete direita
  backgroundImagem1 = loadImage('fundo1.png'); // Carrega a imagem de fundo
  backgroundImagem2 = loadImage('fundo2.png'); // Carrega a segunda imagem de fundo   
  beep = new p5.Oscillator('sine'); // Cria um oscilador de onda senoidal
  beep.start(); // Inicia o oscilador
  beep.amp(0); // Sem volume inicial
}

// Configura o ambiente do jogo
function setup() {
  createCanvas(800, 400); // Cria a tela
  ball = new Ball(width / 2, height / 2, 30); // Cria a bola
  leftPaddle = new Paddle(10, height / 2 - 50, 20, 100, true); // Raquete do jogador
  rightPaddle = new Paddle(width - 30, height / 2 - 50, 20, 100, false); // Raquete do computador
}

// Função principal chamada a cada frame
function draw() {
  background(30, 30, 60); // Cor de fundo
  leftPaddle.move(); // Move raquete do jogador
  rightPaddle.move(ball.y); // Move raquete do computador
  leftPaddle.draw(); // Desenha raquete do jogador
  rightPaddle.draw(); // Desenha raquete do computador
  ball.move(); // Move a bola
  ball.draw(); // Desenha a bola
  checkCollisions(); // Verifica colisões e pontuação
  displayScore(); // Exibe o placar
}

// Verifica colisões da bola com as raquetes e pontuação
function checkCollisions() {
  leftPaddle.checkCollision(ball); // Colisão com raquete do jogador
  rightPaddle.checkCollision(ball); // Colisão com raquete do computador

  // Se a bola sair pela esquerda, computador marca ponto
  if (ball.x < 0) {
    rightScore++;
    ball.reset(); // Reinicia a bola
  }
  // Se a bola sair pela direita, jogador marca ponto
  if (ball.x > width) {
    leftScore++;
    ball.reset(); // Reinicia a bola
  }
}

// Toca um beep ao rebater a bola
function playBeep() {
  beep.freq(600); // Frequência do beep
  beep.amp(0.5, 0.05); // Volume do beep
  setTimeout(() => beep.amp(0, 0.1), 100); // Diminui o volume após 100ms
}

// Exibe o placar na tela
function displayScore() {
  textSize(32); // Tamanho do texto
  fill(255); // Cor do texto
  textAlign(CENTER, TOP); // Alinhamento
  text(leftScore, width / 4, 20); // Placar do jogador
  text(rightScore, (3 * width) / 4, 20); // Placar do computador
}