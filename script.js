const gameBoardElement = document.querySelector('#gameboard');
const clearButton = document.querySelector('#clear');

const Gameboard = (() => {
  let currentPlayer = 'player';
  let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const markSquare = (row, collumn) => {
    if (currentPlayer === 'player') {
      gameBoard[row][collumn] = 'X';
      currentPlayer = 'cpu';
    } else {
      gameBoard[row][collumn] = 'O';
      currentPlayer = 'player';
    }
    displayBoard();
  };

  const displayBoard = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const square = gameBoardElement.querySelector(
          `[data-position="${row}${col}"]`
        );
        square.textContent = gameBoard[row][col];
      }
    }
  };

  const clearBoard = () => {
    gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    displayBoard();
  };

  return {
    markSquare,
    clearBoard,
  };
})();

gameBoardElement.addEventListener('click', e => {
  clickTarget = e.target.dataset.position.split('');
  let row = Number(clickTarget[0]);
  let collumn = Number(clickTarget[1]);
  Gameboard.markSquare(row, collumn);
});

clearButton.addEventListener('click', () => {
  Gameboard.clearBoard();
});
