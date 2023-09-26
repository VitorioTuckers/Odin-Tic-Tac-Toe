const gameBoardElement = document.querySelector('#gameboard');
const clearButton = document.querySelector('#clear');

const Gameboard = (() => {
  let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const restartGame = () => {
    gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    updateDisplay();
  };

  const checkWin = player => {
    for (let i = 0; i < 3; i++) {
      if (
        (gameBoard[i][0] === player &&
          gameBoard[i][1] === player &&
          gameBoard[i][2] === player) ||
        (gameBoard[0][i] === player &&
          gameBoard[1][i] === player &&
          gameBoard[2][i] === player)
      ) {
        return true;
      }
    }

    if (
      (gameBoard[0][0] === player &&
        gameBoard[1][1] === player &&
        gameBoard[2][2] === player) ||
      (gameBoard[0][2] === player &&
        gameBoard[1][1] === player &&
        gameBoard[2][0] === player)
    ) {
      return true;
    }

    return false;
  };

  const gameFlow = () => {
    updateDisplay();
    if (checkWin('X')) {
      setTimeout(() => {
        alert('Player X wins');
        restartGame();
      }, 1000);
    } else if (checkWin('O')) {
      setTimeout(() => {
        alert('Player O wins');
        restartGame();
      }, 1000);
    }
  };

  const updateDisplay = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const square = gameBoardElement.querySelector(
          `[data-position="${row}${col}"]`
        );
        square.textContent = gameBoard[row][col];
      }
    }
  };

  const markSquare = (row, collumn) => {
    gameBoard[row][collumn] = 'X';
    gameFlow();
  };

  return {
    markSquare,
  };
})();

gameBoardElement.addEventListener('click', e => {
  clickTarget = e.target.dataset.position.split('');
  let row = Number(clickTarget[0]);
  let collumn = Number(clickTarget[1]);
  Gameboard.markSquare(row, collumn);
});
