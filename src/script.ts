const XSVG = `<svg class="X" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M 0 0 l 24 24"/><path d="M 24 0 l -24 24"/></svg>`;
const OSVG = `<svg class="O" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M 12 0 a 12 12 0 1 0 0 24 a 12 12 0 1 0 0 -24" /></svg>`;

const XDIV = document.querySelector(".x-score") as HTMLElement;
const ODIV = document.querySelector(".o-score") as HTMLElement;

const select = document.querySelector(".select-player") as HTMLInputElement;
const selectPlayerElement = document.getElementById(
  "playerSelection"
) as HTMLElement;
const selectFriend = document.getElementById("friend") as HTMLInputElement;
const selectComputer = document.getElementById("computer") as HTMLInputElement;

const instructionsElement = document.getElementById(
  "instructions"
) as HTMLElement;
const readyElement = document.getElementById("ready") as HTMLInputElement

const winningMessageElement = document.getElementById(
  "winningMessage"
) as HTMLElement;
const winnerMessageText = document.querySelector(
  ".winning-message-text"
) as HTMLElement;
const resetBtn = document.getElementById("resetButton") as HTMLInputElement;

const cells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;

const XDivIcon = XDIV.querySelector(".icon") as HTMLElement;
const ODivIcon = ODIV.querySelector(".icon") as HTMLElement;

const XDivScore = XDIV.querySelector(".score") as HTMLElement;
const ODivScore = ODIV.querySelector(".score") as HTMLElement;

XDivIcon.innerHTML = XSVG;
ODivIcon.innerHTML = OSVG;

XDIV.style.pointerEvents = "none";
ODIV.style.pointerEvents = "none";

let GAME_STARTED = false;
let playerSymbol = "X";
let X_SCORE = 0;
let O_SCORE = 0;
let opponent = ""

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let result = "";

selectFriend?.addEventListener("click", (event) => {
  opponent = "human"
  selectPlayerElement.classList.add("hide");
  instructionsElement.classList.add("show");
});

readyElement?.addEventListener("click", (event) => {
  instructionsElement.classList.remove("show")
})

function startGame() {
  GAME_STARTED = true;

  cells.forEach((cell) => {
    cell.style.pointerEvents = "all";
  });
}

function endGame() {
  GAME_STARTED = false;

  cells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}

function declareWinner(result: string) {
  if (result != "DRAW") {
    result === "X" ? X_SCORE++ : O_SCORE++;
    result === "X"
      ? (XDivScore.innerHTML = String(X_SCORE))
      : (ODivScore.innerHTML = String(O_SCORE));

    result === "X"
      ? winnerMessageText?.classList.add("X")
      : winnerMessageText?.classList.add("O");
    winnerMessageText.innerText = `${result} is the winner!`;
  } else if (result === "DRAW") {
    winnerMessageText.innerText = "Draw!";
  }

  winningMessageElement?.classList.add("show");
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
      result = combinations[i][0];
      endGame();
      declareWinner(result);
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
  }, 100);

  let row = Number(cell.parentElement?.classList[1].replace("row", "")) * 1 - 1;
  let column = Number(cell.classList[1].replace("cell", "")) * 1 - 1;

  updateBoard(playerSymbol, row, column);
  checkWinner();
}


cells.forEach((cell: HTMLElement) => {
  cell.innerHTML = XSVG + OSVG;
  cell.addEventListener("click", function click(event) {

    !GAME_STARTED && startGame();

    if (opponent === "human") {
      makeMove(event.target as HTMLElement, playerSymbol);
      playerSymbol = playerSymbol === "X" ? "O" : "X";
    }
    // add here for computer
  });
});

resetBtn?.addEventListener("click", (event) => {
  GAME_STARTED = false;

  winningMessageElement.classList.remove("show");

  playerSymbol = result === "X" ? "O" : "X";

  result = "";

  console.log(document.querySelector("player-active")?.classList[0]);

  board = board.map((row) => row.map(() => ""));

  cells.forEach((cell) => {
    cell.style.pointerEvents = "all";
    cell.querySelectorAll("svg").forEach((s) => {
      s.style.display = "none";
      s.style.strokeDashoffset = s.classList.contains("X") ? "36" : "76";
    });
  });
});
