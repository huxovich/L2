document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const newGameBtn = document.getElementById("new-game-btn");
  const turnText = document.getElementById("turn-text");

  let currentPlayer = "X";
  
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
  ];

  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const checkWinner = () => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return true;
      }
    }
    return false;
  }

  const checkDraw = () => {
    return gameBoard.every(cell => cell !== "");
  }

  const handleCellClick = (index) => {
    if (gameBoard[index] === "") {
      gameBoard[index] = currentPlayer;
      cells[index].textContent = currentPlayer;

      if (checkWinner()) {
        turnText.textContent = `Player ${currentPlayer} wins!`;
        cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
      } else if (checkDraw()) {
        turnText.textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnText.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
  });

  newGameBtn.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell, index) => {
      cell.textContent = "";
      cell.addEventListener("click", () => handleCellClick(index));
    });
    currentPlayer = "X";
    turnText.textContent = "Player X's turn";
  });
});
