const buttons = document.querySelectorAll('.js-button');
let currentPlayer = 1;
let gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // Состояние игрового поля
let gameActive = true;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтали
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикали
  [0, 4, 8], [2, 4, 6] // Диагонали
];

function checkWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (gameState[a] !== 0 && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  return 0;
}

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (gameState[index] === 0 && gameActive) {
      gameState[index] = currentPlayer;
      if (currentPlayer === 1) {
        button.innerHTML = `<img src="img/light-sabers.png" class="img-inside">`;
        currentPlayer = 2;
      } else {
        button.innerHTML = `<img src="img/viking-shield.png" class="img-inside">`;
        currentPlayer = 1;
      }

      const winner = checkWinner();
      if (winner !== 0) {
        gameActive = false;
        const wintext = winner === 1 ? 'Knights win!' : 'Vikings win!';
        document.querySelector('.winner')
          .innerHTML = `${wintext}<button class ="reset js-reset">Play again</button>`;

        document.querySelector('.js-reset')
          .addEventListener('click', () => {
            gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];  
            gameActive = true;
            buttons.forEach(button => {
              button.innerHTML = '';
            });
            document.querySelector('.winner')
              .innerHTML = "";
          });
      }
    }
  });
});