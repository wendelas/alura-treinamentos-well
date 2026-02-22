# Pong Interativo com p5.js — Explicação Didática

Este projeto implementa um jogo Pong simples e interativo usando a biblioteca p5.js. O objetivo é ensinar conceitos de programação orientada a objetos, manipulação gráfica e lógica de jogos de forma didática, explicando cada parte do código.

## Objetivo do Jogo

O jogador controla a raquete da esquerda usando o mouse. O computador controla a raquete da direita. O objetivo é rebater a bola e marcar pontos quando a bola passar pela raquete adversária.

---

## Estrutura do Código

O código está dividido em três partes principais:

1. **Declaração de variáveis globais**
2. **Definição das classes (`Ball` e `Paddle`)**
3. **Funções principais do p5.js (`preload`, `setup`, `draw`) e funções auxiliares**

---

## Variáveis Globais

- `ball`: Instância da classe Ball, representa a bola do jogo.
- `leftPaddle`: Instância da classe Paddle, representa a raquete do jogador.
- `rightPaddle`: Instância da classe Paddle, representa a raquete do computador.
- `leftScore`: Pontuação do jogador (inicia em 0).
- `rightScore`: Pontuação do computador (inicia em 0).
- `beep`: Objeto de som para tocar quando o jogador rebate a bola.

---

## Classes

### Classe Ball

Representa a bola do jogo.

- **Construtor**: Recebe posição inicial e diâmetro. Define cor aleatória e velocidade inicial.
- **Métodos**:
  - `resetSpeed()`: Define velocidade aleatória para a bola.
  - `move()`: Atualiza a posição da bola e rebate nas bordas superior/inferior.
  - `draw()`: Desenha a bola na tela.
  - `reset()`: Centraliza a bola, muda a cor e redefine a velocidade.

### Classe Paddle

Representa uma raquete (jogador ou computador).

- **Construtor**: Recebe posição, tamanho e se é controlada pelo jogador.
- **Métodos**:
  - `move(ballY)`: Move a raquete. Se for do jogador, segue o mouse; se for do computador, segue a bola.
  - `draw()`: Desenha a raquete na tela.
  - `checkCollision(ball)`: Verifica colisão com a bola e rebate se necessário.

---

## Funções Principais

### preload()
Carrega o som antes do início do jogo.

### setup()
Configura o ambiente do jogo, criando a tela e instanciando bola e raquetes.

### draw()
Função principal chamada a cada frame (ciclo de atualização do jogo):
1. Limpa a tela.
2. Move e desenha as raquetes.
3. Move e desenha a bola.
4. Verifica colisões e pontuação.
5. Exibe o placar.

### checkCollisions()
Verifica colisões da bola com as raquetes e se houve ponto.

### playBeep()
Toca um som quando o jogador rebate a bola.

### displayScore()
Exibe o placar na tela.

---

## Ordem de Execução do Código

1. **Carregamento**: O navegador carrega o arquivo e executa `preload()` para preparar o som.
2. **Inicialização**: `setup()` é chamado uma vez para criar a tela e instanciar os objetos.
3. **Loop Principal**: `draw()` é chamado repetidamente (60 vezes por segundo, por padrão):
   - Move as raquetes (`move()` de cada Paddle)
   - Desenha as raquetes (`draw()` de cada Paddle)
   - Move a bola (`move()` da Ball)
   - Desenha a bola (`draw()` da Ball)
   - Verifica colisões e pontuação (`checkCollisions()`)
   - Exibe o placar (`displayScore()`)

---

## Explicação Linha a Linha

O código está totalmente comentado, explicando cada linha e bloco. Recomenda-se que o aluno leia o arquivo `sketch_pessoal.js` junto com este README para entender o papel de cada linha.

- **Variáveis globais**: Definem os elementos principais do jogo.
- **Classes**: Encapsulam o comportamento da bola e das raquetes.
- **Funções do p5.js**: Controlam o ciclo de vida do jogo.
- **Funções auxiliares**: Gerenciam colisões, som e placar.

---

## Dicas para o Aluno

- Experimente alterar cores, velocidades e tamanhos para ver como o jogo muda.
- Tente adicionar novos recursos, como aumentar a velocidade da bola a cada ponto.
- Use os comentários do código para entender o fluxo de execução.
- Se tiver dúvidas, leia o código devagar e tente prever o que cada função faz antes de rodar.

---

## Requisitos

- Inclua a biblioteca p5.js e p5.sound no seu HTML:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/addons/p5.sound.min.js"></script>
```

---

## Conclusão

Este projeto é uma ótima base para aprender lógica de jogos, orientação a objetos e manipulação gráfica com p5.js. Explore, modifique e divirta-se aprendendo!
