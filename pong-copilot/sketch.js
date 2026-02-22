// Código base do p5.js para criar o jogo de Pong

// Variáveis do jogo
let game = {
  ball: {
    position: { x: 300, y: 200 }, // Posição inicial da bola
    diameter: 50, // Diâmetro da bola
    speed: { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 } // Velocidade aleatória da bola
  },
  paddles: {
    left: null, // Paddles ainda não implementados
    right: null // Paddles ainda não implementados
  },
  score: {
    left: 0, // Pontuação do jogador da esquerda
    right: 0 // Pontuação do jogador da direita
  }
};

// Função para configurar o ambiente do jogo
function setup() {
  createCanvas(800, 400); // Cria uma tela de 800x400 pixels
}

// Função chamada repetidamente para atualizar o jogo
function draw() {
  displayScore(); // Exibe a pontuação atual
  updateBallPosition(); // Atualiza a posição da bola
  checkBallCollision(); // Verifica colisões da bola com as bordas
}

// Função para exibir a pontuação e a bola na tela
function displayScore() {
  background(0); // Define o fundo como preto
  fill(255); // Define a cor de preenchimento como branca
  ellipse(game.ball.position.x, game.ball.position.y, game.ball.diameter, game.ball.diameter); // Desenha a bola
  console.log(game.ball.position.x); // Log da posição X da bola
  console.log(game.ball.position.y); // Log da posição Y da bola
}

// Função para atualizar a posição da bola com base na sua velocidade
function updateBallPosition() {
  game.ball.position.x += game.ball.speed.x; // Atualiza a posição X da bola
  game.ball.position.y += game.ball.speed.y; // Atualiza a posição Y da bola
}

// Função para verificar colisões da bola com as bordas da tela
function checkBallCollision() {
  // Se tocar na borda direita ou esquerda, inverte a direção
  if (game.ball.position.x > width - game.ball.diameter / 2 || game.ball.position.x < game.ball.diameter / 2) {
    game.ball.speed.x *= -1; // Inverte a velocidade X
  }
  // Se tocar na borda superior ou inferior, inverte a direção
  if (game.ball.position.y > height - game.ball.diameter / 2 || game.ball.position.y < game.ball.diameter / 2) {
    game.ball.speed.y *= -1; // Inverte a velocidade Y
  }
}
