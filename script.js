const gameBoardElement = document.querySelector('#gameboard');
const clearButton = document.querySelector('#clear');

const playerFactory = (nickname, markStyle) => {
  return { nickname, markStyle };
};

const Gameboard = (() => {
  let turn = 'player1';

  let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const toc = playerFactory('Toc', 'O');

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

  const gameFlow = (player1, player2) => {
    updateDisplay();
    if (checkWin(player1.markStyle)) {
      setTimeout(() => {
        alert(`Player ${player1.nickname} wins`);
        restartGame();
      }, 1000);
    } else if (checkWin(player2.markStyle)) {
      setTimeout(() => {
        alert(`Player ${player2.nickname} wins`);
        restartGame();
      }, 1000);
    }
    turn === 'player1' ? (turn = 'player2') : (turn = 'player1');
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

  const markSquare = (row, collumn, player1, player2 = toc) => {
    if (turn === 'player1') {
      gameBoard[row][collumn] = player1.markStyle;
    } else {
      gameBoard[row][collumn] = player2.markStyle;
    }
    gameFlow(player1, player2);
  };

  return {
    markSquare,
  };
})();

gameBoardElement.addEventListener('click', e => {
  clickTarget = e.target.dataset.position.split('');
  let row = Number(clickTarget[0]);
  let collumn = Number(clickTarget[1]);
  const tuco = playerFactory('Tuco', 'X');
  Gameboard.markSquare(row, collumn, tuco);
});
