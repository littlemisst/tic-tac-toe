"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var XSVG = "<svg class=\"X\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M 0 0 l 24 24\"/><path d=\"M 24 0 l -24 24\"/></svg>";
var OSVG = "<svg class=\"O\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path fill=\"none\" d=\"M 12 0 a 12 12 0 1 0 0 24 a 12 12 0 1 0 0 -24\" /></svg>";
var XDIV = document.querySelector(".x-score");
var ODIV = document.querySelector(".o-score");
var playerTurn = document.querySelector(".player-turn");
var playerTurnElement = document.getElementById("playerTurn");
var select = document.querySelector(".select-player");
var selectPlayerElement = document.getElementById("playerSelection");
var selectFriend = document.getElementById("friend");
var selectComputer = document.getElementById("computer");
var instructionsElement = document.getElementById("instructions");
var instructionText = document.querySelector(".instructions-text");
var readyElement = document.getElementById("ready");
var winningMessageElement = document.getElementById("winningMessage");
var winnerMessageText = document.querySelector(".winning-message-text");
var playAgainButton = document.getElementById("resetButton");
var dareMessageElement = document.getElementById("dareMessage");
var dareMessageText = document.querySelector(".dare-message-text");
var dareButton = document.getElementById("generateDare");
var endGameDareButton = document.getElementById("endGameDare");
var endGameButton = document.getElementById("endGame");
var cells = document.querySelectorAll(".cell");
var XDivIcon = XDIV.querySelector(".icon");
var ODivIcon = ODIV.querySelector(".icon");
var XDivScore = XDIV.querySelector(".score");
var ODivScore = ODIV.querySelector(".score");
var loading = document.getElementById("loading");
var GAME_STARTED = false;
var playerSymbol = "X";
var X_SCORE = 0;
var O_SCORE = 0;
var opponent = "";
var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];
var result = "";
var currentPlayer = "";
XDivIcon.innerHTML = XSVG;
ODivIcon.innerHTML = OSVG;
XDIV.style.pointerEvents = "none";
ODIV.style.pointerEvents = "none";
function getRandomDare() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.truthordarebot.xyz/api/dare")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.question];
            }
        });
    });
}
function endGame() {
    GAME_STARTED = false;
    playerSymbol = "X";
    result = "";
    board = board.map(function (row) { return row.map(function () { return ""; }); });
    cells.forEach(function (cell) {
        cell.style.pointerEvents = "all";
        cell.querySelectorAll("svg").forEach(function (s) {
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
    cells.forEach(function (cell) {
        cell.style.pointerEvents = "all";
    });
}
function endRound() {
    GAME_STARTED = false;
    cells.forEach(function (cell) {
        cell.style.pointerEvents = "none";
    });
    if (playerSymbol === "X") {
        playerTurnElement.classList.remove("X");
        playerTurnElement.classList.add("O");
    }
    else {
        playerTurnElement.classList.remove("O");
        playerTurnElement.classList.add("X");
    }
}
function declareWinner(result) {
    if (result != "DRAW") {
        result === "X" ? X_SCORE++ : O_SCORE++;
        result === "X"
            ? (XDivScore.innerHTML = String(X_SCORE))
            : (ODivScore.innerHTML = String(O_SCORE));
        if (result === "X") {
            winnerMessageText === null || winnerMessageText === void 0 ? void 0 : winnerMessageText.classList.add("X");
            winnerMessageText === null || winnerMessageText === void 0 ? void 0 : winnerMessageText.classList.remove("O");
        }
        else {
            winnerMessageText === null || winnerMessageText === void 0 ? void 0 : winnerMessageText.classList.add("O");
            winnerMessageText === null || winnerMessageText === void 0 ? void 0 : winnerMessageText.classList.remove("X");
        }
        winnerMessageText.innerText = "".concat(result, " is the winner!");
    }
    else if (result === "DRAW") {
        winnerMessageText.innerText = "Draw!";
        winnerMessageText === null || winnerMessageText === void 0 ? void 0 : winnerMessageText.classList.remove("O");
        winnerMessageText === null || winnerMessageText === void 0 ? void 0 : winnerMessageText.classList.remove("X");
    }
    winningMessageElement === null || winningMessageElement === void 0 ? void 0 : winningMessageElement.classList.add("show");
    if (X_SCORE === 3 || O_SCORE === 3) {
        dareMessageElement === null || dareMessageElement === void 0 ? void 0 : dareMessageElement.classList.add("show");
        dareMessageText.innerText = "Player ".concat(X_SCORE === 3 ? "X" : "O", " wins! ").concat(X_SCORE === 3 ? "O" : "X", " should do the dare.");
    }
}
function checkWinner() {
    var leftDiag = [board[0][0], board[1][1], board[2][2]];
    var rightDiag = [board[0][2], board[1][1], board[2][0]];
    var firstCol = [board[0][0], board[1][0], board[2][0]];
    var secondCol = [board[0][1], board[1][1], board[2][1]];
    var thirdCol = [board[0][2], board[1][2], board[2][2]];
    var combinations = board.concat([leftDiag, rightDiag]);
    combinations.push(firstCol);
    combinations.push(secondCol);
    combinations.push(thirdCol);
    var _loop_1 = function (i) {
        var isWinning = combinations[i].every(function (element) { return element != "" && element === combinations[i][0]; });
        if (isWinning) {
            result = combinations[i][0];
            endRound();
            declareWinner(result);
            return { value: true };
        }
    };
    for (var i = 0; i < combinations.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    if (board.flat().every(function (element) { return element != ""; })) {
        declareWinner("DRAW");
        endRound();
    }
    return false;
}
function updateBoard(value, row, column) {
    board[row][column] = value;
}
function makeMove(cell, playerSymbol) {
    var _a;
    currentPlayer = "human";
    cell.style.pointerEvents = "none";
    var svg = cell.querySelector(".".concat(playerSymbol));
    svg.style.display = "block";
    setTimeout(function () {
        svg.style.strokeDashoffset = "0";
    }, 100);
    var row = Number((_a = cell.parentElement) === null || _a === void 0 ? void 0 : _a.classList[1].replace("row", "")) * 1 - 1;
    var column = Number(cell.classList[1].replace("cell", "")) * 1 - 1;
    updateBoard(playerSymbol, row, column);
    checkWinner();
}
cells.forEach(function (cell) {
    cell.innerHTML = XSVG + OSVG;
    cell.addEventListener("click", function click(event) {
        !GAME_STARTED && startRound();
        if (opponent === "human") {
            makeMove(event.target, playerSymbol);
            playerSymbol = playerSymbol === "X" ? "O" : "X";
        }
        else {
            makeMove(event.target, "O");
            bestMove(cells, board);
        }
    });
});
// selecting opponents
selectFriend.addEventListener("click", function (event) {
    opponent = "human";
    selectPlayerElement.classList.add("hide");
    instructionsElement.classList.add("show");
    instructionText.innerText = 'The first one who will score 3 points will be the winner. The loser should do a randomly generated dare. Goodluck!';
});
selectComputer.addEventListener("click", function () {
    opponent = "computer";
    selectPlayerElement.classList.add("hide");
    instructionsElement.classList.add("show");
    bestMove(cells, board);
    currentPlayer = "computer";
    instructionText.innerText = 'This feature is not working properly. You will be encountering a lot of bugs while playing with the computer. Proceed at your own risk. Lol. The developer will soon fix this bug...if she is not being lazy...';
});
// button after reading the instructions for friend opponent
readyElement.addEventListener("click", function (event) {
    instructionsElement.classList.remove("show");
    playerTurnElement.classList.add("X");
    playerTurn.innerText = "Player ".concat(playerSymbol, " goes first");
    setTimeout(function () {
        playerTurnElement.classList.add("hide");
    }, 2000);
});
// button when a player wins to generate random dare
dareButton.addEventListener("click", function (event) {
    dareButton.classList.add("hide");
    dareMessageText.classList.add("hide");
    loading.classList.add("show");
    getRandomDare().then(function (dareText) {
        dareMessageText.classList.remove("hide");
        dareMessageText.innerText = dareText;
        endGameDareButton.classList.add("show");
        loading.classList.remove("show");
    });
});
// button to end game after the dare is generated
endGameDareButton.addEventListener("click", function (event) {
    endGame();
});
// global button to abruptly end game
endGameButton.addEventListener("click", function (event) {
    endGame();
});
playAgainButton.addEventListener("click", function (event) {
    GAME_STARTED = false;
    winningMessageElement.classList.remove("show");
    playerSymbol = result === "X" ? "O" : "X";
    result = "";
    board = board.map(function (row) { return row.map(function () { return ""; }); });
    cells.forEach(function (cell) {
        cell.style.pointerEvents = "all";
        cell.querySelectorAll("svg").forEach(function (s) {
            s.style.display = "none";
            s.style.strokeDashoffset = s.classList.contains("X") ? "36" : "76";
        });
    });
    playerTurn.innerText = "Player ".concat(playerSymbol, " goes first");
    playerTurnElement.classList.remove("hide");
    setTimeout(function () {
        playerTurnElement.classList.add("hide");
    }, 2000);
});
