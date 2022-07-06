const XSVG = `<svg class="X" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M 0 0 l 24 24"/><path d="M 24 0 l -24 24"/></svg>`;
const OSVG = `<svg class="O" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M 12 0 a 12 12 0 1 0 0 24 a 12 12 0 1 0 0 -24" /></svg>`;

const XDIV = document.querySelector(".x-score") as HTMLElement;
const ODIV = document.querySelector(".o-score") as HTMLElement;

const playerTurn = document.querySelector(".player-turn") as HTMLInputElement;
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
const instructionText = document.querySelector(
  ".instructions-text"
) as HTMLElement;
const readyElement = document.getElementById("ready") as HTMLInputElement;

const winningMessageElement = document.getElementById(
  "winningMessage"
) as HTMLElement;
const winnerMessageText = document.querySelector(
  ".winning-message-text"
) as HTMLElement;
const playAgainButton = document.getElementById(
  "resetButton"
) as HTMLInputElement;

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

const loading = document.getElementById("loading") as HTMLElement;

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

let currentPlayer = "";

XDivIcon.innerHTML = XSVG;
ODivIcon.innerHTML = OSVG;

XDIV.style.pointerEvents = "none";
ODIV.style.pointerEvents = "none";

async function getRandomDare() {
  const response = await fetch("https://api.truthordarebot.xyz/api/dare");
  const data = await response.json();
  return data.question;
}

function endGame() {
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

  XDivScore.innerHTML = String(X_SCORE);
  ODivScore.innerHTML = String(O_SCORE);

  selectPlayerElement.classList.remove("hide");
  dareMessageElement.classList.remove("show");
  winningMessageElement.classList.remove("show");
}

function startRound() {
  GAME_STARTED = true;

  cells.forEach((cell) => {
    cell.style.pointerEvents = "all";
  });
}

function endRound() {
  GAME_STARTED = false;

  cells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });

  if (playerSymbol === "X") {
    playerTurnElement.classList.remove("X");
    playerTurnElement.classList.add("O");
  } else {
    playerTurnElement.classList.remove("O");
    playerTurnElement.classList.add("X");
  }
}

function declareWinner(result: string) {
  if (result != "DRAW") {
    result === "X" ? X_SCORE++ : O_SCORE++;
    result === "X"
      ? (XDivScore.innerHTML = String(X_SCORE))
      : (ODivScore.innerHTML = String(O_SCORE));

    if (result === "X") {
      winnerMessageText?.classList.add("X");
      winnerMessageText?.classList.remove("O");
    } else {
      winnerMessageText?.classList.add("O");
      winnerMessageText?.classList.remove("X");
    }

    winnerMessageText.innerText = `${result} is the winner!`;
  } else if (result === "DRAW") {
    winnerMessageText.innerText = "Draw!";
    winnerMessageText?.classList.remove("O");
    winnerMessageText?.classList.remove("X");
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
      endRound();
      declareWinner(result);
      return true;
    }
  }

  if (board.flat().every((element) => element != "")) {
    declareWinner("DRAW");
    endRound();
  }

  return false;
}

function updateBoard(value: string, row: number, column: number) {
  board[row][column] = value;
}

function makeMove(cell: HTMLElement, playerSymbol: string) {
  currentPlayer = "human";

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
    !GAME_STARTED && startRound();

    if (opponent === "human") {
      makeMove(event.target as HTMLElement, playerSymbol);
      playerSymbol = playerSymbol === "X" ? "O" : "X";
    } else {
      makeMove(event.target as HTMLElement, "O");
      bestMove(cells, board);
    }
  });
});

// selecting opponents
selectFriend.addEventListener("click", (event) => {
  opponent = "human";
  selectPlayerElement.classList.add("hide");
  instructionsElement.classList.add("show");
  instructionText.innerText = 'The first one who will score 3 points will be the winner. The loser should do a randomly generated dare. Goodluck!';
});

selectComputer.addEventListener("click", () => {
  opponent = "computer";
  selectPlayerElement.classList.add("hide");
  instructionsElement.classList.add("show");
  bestMove(cells, board);
  currentPlayer = "computer"
  instructionText.innerText = 'This feature is not working properly. You will be encountering a lot of bugs while playing with the computer. Proceed at your own risk. Lol. The developer will soon fix this bug...if she is not being lazy...';
});

// button after reading the instructions for friend opponent
readyElement.addEventListener("click", (event) => {
  instructionsElement.classList.remove("show");

  playerTurnElement.classList.add("X");

  playerTurn.innerText = `Player ${playerSymbol} goes first`;

  setTimeout(() => {
    playerTurnElement.classList.add("hide");
  }, 2000);
});

// button when a player wins to generate random dare
dareButton.addEventListener("click", (event) => {
  dareButton.classList.add("hide");
  dareMessageText.classList.add("hide");
  loading.classList.add("show");

  getRandomDare().then((dareText) => {
    dareMessageText.classList.remove("hide");
    dareMessageText.innerText = dareText as string;
    endGameDareButton.classList.add("show");
    loading.classList.remove("show");
  });
});

// button to end game after the dare is generated
endGameDareButton.addEventListener("click", (event) => {
  endGame();
});

// global button to abruptly end game
endGameButton.addEventListener("click", (event) => {
  endGame();
});

playAgainButton.addEventListener("click", (event) => {
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
