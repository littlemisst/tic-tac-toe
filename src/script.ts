const XSVG = `<svg class="X" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M 0 0 l 24 24"/><path d="M 24 0 l -24 24"/></svg>`;
const OSVG = `<svg class="O" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M 12 0 a 12 12 0 1 0 0 24 a 12 12 0 1 0 0 -24" /></svg>`;

const XDIV = document.querySelector(".x-score") as HTMLElement;
const ODIV = document.querySelector(".o-score") as HTMLElement;

let playerTurn = document.querySelector(".player-turn") as HTMLInputElement;
const playerTurnElement = document.getElementById("playerTurn") as HTMLElement;

const select = document.querySelector(".select-player") as HTMLInputElement;
const selectPlayerElement = document.getElementById(
  "playerSelection"
) as HTMLElement;
const selectFriend = document.getElementById("friend") as HTMLInputElement;
const selectComputer = document.getElementById("computer") as HTMLInputElement;

const instructionsElement = document.getElementById(
  "instructions"
) as HTMLElement;
const readyElement = document.getElementById("ready") as HTMLInputElement;

const winningMessageElement = document.getElementById(
  "winningMessage"
) as HTMLElement;
const winnerMessageText = document.querySelector(
  ".winning-message-text"
) as HTMLElement;
const resetBtn = document.getElementById("resetButton") as HTMLInputElement;

const dareMessageElement = document.getElementById(
  "dareMessage"
) as HTMLElement;
const dareMessageText = document.querySelector(
  ".dare-message-text"
) as HTMLElement;
const dareButton = document.getElementById("generateDare") as HTMLInputElement;
const endGameDareButton = document.getElementById(
  "endGameDare"
) as HTMLInputElement;

const endGameButton = document.getElementById("endGame") as HTMLInputElement;

const cells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;

const XDivIcon = XDIV.querySelector(".icon") as HTMLElement;
const ODivIcon = ODIV.querySelector(".icon") as HTMLElement;

const XDivScore = XDIV.querySelector(".score") as HTMLElement;
const ODivScore = ODIV.querySelector(".score") as HTMLElement;

let GAME_STARTED = false;
let playerSymbol = "X";
let X_SCORE = 0;
let O_SCORE = 0;
let opponent = "";

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let result = "";

XDivIcon.innerHTML = XSVG;
ODivIcon.innerHTML = OSVG;

XDIV.style.pointerEvents = "none";
ODIV.style.pointerEvents = "none";

selectFriend?.addEventListener("click", (event) => {
  opponent = "human";
  selectPlayerElement.classList.add("hide");
  instructionsElement.classList.add("show");
});

readyElement?.addEventListener("click", (event) => {
  instructionsElement.classList.remove("show");

  playerTurn.innerText = `Player ${playerSymbol} goes first`;

  setTimeout(() => {
    playerTurnElement.classList.add("hide");
  }, 2000);
});

async function getRandomDare() {
  const response = await fetch("https://api.truthordarebot.xyz/api/dare");
  const data = await response.json();
  return data.question;
}

dareButton.addEventListener("click", (event) => {
  getRandomDare().then((dareText) => {
    dareMessageText.innerText = dareText as string;
    dareButton.classList.add("hide");
    endGameDareButton.classList.add("show");
  });
});

endGameDareButton.addEventListener("click", (event) => {
  console.log("end game na woooh");

  GAME_STARTED = false;

  playerSymbol = "X";

  result = "";

  board = board.map((row) => row.map(() => ""));

  cells.forEach((cell) => {
    cell.style.pointerEvents = "all";
    cell.querySelectorAll("svg").forEach((s) => {
      s.style.display = "none";
      s.style.strokeDashoffset = s.classList.contains("X") ? "36" : "76";
    });
  });

  X_SCORE = 0;
  O_SCORE = 0;

  XDivScore.innerHTML = String(X_SCORE)
  ODivScore.innerHTML = String(O_SCORE);

  selectPlayerElement.classList.remove("hide");
  dareMessageElement.classList.remove("show");
  winningMessageElement.classList.remove("show");
  console.log(selectPlayerElement.classList.remove("hide"));
});

endGameButton.addEventListener("click", (event) => {
  console.log("end game na woooh");
  // selectPlayerElement.classList.remove("hide")
  GAME_STARTED = false;

  playerSymbol = "X";

  result = "";

  board = board.map((row) => row.map(() => ""));

  cells.forEach((cell) => {
    cell.style.pointerEvents = "all";
    cell.querySelectorAll("svg").forEach((s) => {
      s.style.display = "none";
      s.style.strokeDashoffset = s.classList.contains("X") ? "36" : "76";
    });
  });

  X_SCORE = 0;
  O_SCORE = 0;

  XDivScore.innerHTML = String(X_SCORE)
  ODivScore.innerHTML = String(O_SCORE);

  selectPlayerElement.classList.remove("hide");
  dareMessageElement.classList.remove("show");
  winningMessageElement.classList.remove("show");
  console.log(selectPlayerElement.classList.remove("hide"));
});

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

  if (X_SCORE === 3 || O_SCORE === 3) {
    dareMessageElement?.classList.add("show");
    dareMessageText.innerText = `Player ${X_SCORE === 3 ? "X" : "O"} wins! ${
      X_SCORE === 3 ? "O" : "X"
    } should do the dare.`;
  }
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

  board = board.map((row) => row.map(() => ""));

  cells.forEach((cell) => {
    cell.style.pointerEvents = "all";
    cell.querySelectorAll("svg").forEach((s) => {
      s.style.display = "none";
      s.style.strokeDashoffset = s.classList.contains("X") ? "36" : "76";
    });
  });

  playerTurn.innerText = `Player ${playerSymbol} goes first`;

  playerTurnElement.classList.remove("hide");
  setTimeout(() => {
    playerTurnElement.classList.add("hide");
  }, 2000);
});
