let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = 'two-player';

function setMode(mode) {
  gameMode = mode;
  resetGame();
}

function makeMove(cell, index) {
  if (board[index] === '' && !isGameOver()) {
    cell.textContent = currentPlayer;
    board[index] = currentPlayer;
    if (!checkWin()) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (gameMode === 'computer' && currentPlayer === 'O') {
        computerMove();
      }
    }
  }
}

function computerMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  board[move] = 'O';
  document.querySelectorAll('.cell')[move].textContent = 'O';
  currentPlayer = 'X';
  checkWin();
}

function minimax(board, depth, isMaximizing) {
  let scores = {
    'O': 1,
    'X': -1,
    'tie': 0
  };

  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWin() {
  let winner = checkWinner();
  if (winner !== null) {
    alert(`${winner} wins!`);
    return true;
  }
  if (board.every(cell => cell !== '')) {
    alert('It\'s a tie!');
    return true;
  }
  return false;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(cell => cell !== '')) {
    return 'tie';
  }
  return null;
}

function isGameOver() {
  return checkWinner() !== null;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}
