const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
  [0,1,2],[3,4,5],[6,7,8], // Rows
  [0,3,6],[1,4,7],[2,5,8], // Columns
  [0,4,8],[2,4,6]          // Diagonals
];

function checkWin() {
  for (const cond of winningConditions) {
    const [a, b, c] = cond;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
      gameActive = false;
      return;
    }
  }
  if (!board.includes("")) {
    statusText.textContent = "😐 It's a Draw!";
    gameActive = false;
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  checkWin();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);