const XSVG = `<svg class="X" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M 0 0 l 24 24"/><path d="M 24 0 l -24 24"/></svg>`;
const OSVG = `<svg class="O" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M 12 0 a 12 12 0 1 0 0 24 a 12 12 0 1 0 0 -24" /></svg>`;

let XDIV = document.querySelector(".x-score");
let ODIV = document.querySelector(".o-score");

let select = document.querySelector(".select-player") as HTMLInputElement;
let winner = document.querySelector(".winner") as HTMLElement;
let resetBtn = document.querySelector(".play-again");
let cells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;

let GAME_STARTED = false;
let playerSymbol = "X";

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function startGame() {
  GAME_STARTED = true;
  cells.forEach((cell) => {
    cell.style.pointerEvents = "all";
  });
  select.style.pointerEvents = "none";
}

function endGame() {
  GAME_STARTED = false;
  cells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
  select.style.pointerEvents = "all";
}

function declareWinner(result: string) {
  if (result != "DRAW") {
    let svg = result === "X" ? XSVG : OSVG;
    let str = `<div class="icon">${svg}</div> is the winner!`;

    winner.innerHTML = str;
  } else if (result === "DRAW") {
    winner.innerHTML = "Draw!";
  }
  winner.style.display = "flex";
}

function checkWinner() {
  let leftDiag = [board[0][0], board[1][1], board[2][2]];
  let rightDiag = [board[0][2], board[1][1], board[2][0]];
  let firstCol = [board[0][0], board[1][0], board[2][0]];
  let secondCol = [board[0][1], board[1][1], board[2][1]];
  let thirdCol = [board[0][2], board[1][2], board[2][2]];
  let combinations = board.concat([leftDiag, rightDiag]);
  combinations.push(firstCol);
  combinations.push(secondCol);
  combinations.push(thirdCol);

  for (let i = 0; i < combinations.length; i++) {
    let isWinning = combinations[i].every(
      (element) => element != "" && element === combinations[i][0]
    );
    if (isWinning) {
      let winner = combinations[i][0];
      endGame();
      declareWinner(winner);
      return true;
    }
  }

  if (board.flat().every((element) => element != "")) {
    declareWinner("DRAW");
    endGame();
  }

  return false;
}

function updateBoard(value: string, row: number, column: number) {
  board[row][column] = value;
}

function makeMove(cell: HTMLElement, playerSymbol: string) {
  cell.style.pointerEvents = "none";

  let svg = cell.querySelector(`.${playerSymbol}`) as HTMLElement;
  svg.style.display = "block";

  setTimeout(() => {
    svg.style.strokeDashoffset = "0";
  }, 1);

  let row =
    (cell.parentElement?.classList[1].replace("rows", "") as unknown as number) *
      1 -
    1;
  let column =
    (cell.classList[1].replace("cell", "") as unknown as number) * 1 - 1;

  updateBoard(playerSymbol, row, column);
  checkWinner();
}

cells.forEach((cell: HTMLElement) => {
  cell.innerHTML = XSVG + OSVG;
  cell.addEventListener("click", function click(event) {
    if (!select.value) {
      alert("Choose an opponent");
      return;
    }

    !GAME_STARTED && startGame();

    if (select.value === "human") {
      makeMove(event.target as HTMLElement, playerSymbol);
      playerSymbol = playerSymbol === "X" ? "O" : "X";
    }
  });
});

resetBtn?.addEventListener("click", (event) => {
  GAME_STARTED = false;
  winner.style.display = "none";
  board = board.map((row) => row.map(() => ""));
  cells.forEach((cell) => {
    cell.style.pointerEvents = "all";
    cell.querySelectorAll("svg").forEach((s) => {
      s.style.display = "none";
      s.style.strokeDashoffset = s.classList.contains("X") ? "36" : "76";
    });
  });
});
