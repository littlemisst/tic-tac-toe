"use strict";
var XSVG = "<svg class=\"X\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M 0 0 l 24 24\"/><path d=\"M 24 0 l -24 24\"/></svg>";
var OSVG = "<svg class=\"O\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path fill=\"none\" d=\"M 12 0 a 12 12 0 1 0 0 24 a 12 12 0 1 0 0 -24\" /></svg>";
var XDIV = document.querySelector(".x-score");
var ODIV = document.querySelector(".o-score");
var select = document.querySelector(".select-player");
var resetBtn = document.querySelector(".reset-button");
var winner = document.querySelector(".winner");
var cells = document.querySelectorAll(".cell");
var GAME_STARTED = false;
var playerSymbol = "X";
var X_SCORE = 0;
var O_SCORE = 0;
var XDivIcon = XDIV.querySelector(".icon");
var ODivIcon = ODIV.querySelector(".icon");
XDivIcon.innerHTML = XSVG;
ODivIcon.innerHTML = OSVG;
var XDivScore = XDIV.querySelector(".score");
var ODivScore = ODIV.querySelector(".score");
var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];
var result = "";
function startGame() {
    GAME_STARTED = true;
    cells.forEach(function (cell) {
        cell.style.pointerEvents = "all";
    });
    select.style.pointerEvents = "none";
    XDIV.style.pointerEvents = "none";
    ODIV.style.pointerEvents = "none";
}
function endGame() {
    GAME_STARTED = false;
    cells.forEach(function (cell) {
        cell.style.pointerEvents = "none";
    });
    select.style.pointerEvents = "all";
    XDIV.style.pointerEvents = "all";
    ODIV.style.pointerEvents = "all";
}
function declareWinner(result) {
    if (result != "DRAW") {
        result == "X" ? X_SCORE++ : O_SCORE++;
        result == "X"
            ? (XDivScore.innerHTML = String(X_SCORE))
            : (ODivScore.innerHTML = String(O_SCORE));
        var svg = result == "X" ? XSVG : OSVG;
        var str = "<div class=\"icon\">".concat(svg, "</div> is the winner!");
        winner.innerHTML = str;
    }
    else if (result == "DRAW") {
        winner.innerHTML = "Draw!";
    }
    winner.style.display = "flex";
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
        var isWinning = combinations[i].every(function (element) { return element != "" && element == combinations[i][0]; });
        if (isWinning) {
            result = combinations[i][0];
            endGame();
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
        endGame();
    }
    return false;
}
function updateBoard(value, row, column) {
    board[row][column] = value;
}
function makeMove(cell, playerSymbol) {
    var _a;
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
XDIV.addEventListener("click", function (event) {
    playerSymbol = "X";
    XDIV.classList.add("player-active");
    ODIV.classList.remove("player-active");
});
ODIV.addEventListener("click", function (event) {
    playerSymbol = "O";
    ODIV.classList.add("player-active");
    XDIV.classList.remove("player-active");
});
cells.forEach(function (cell) {
    cell.innerHTML = XSVG + OSVG;
    cell.addEventListener("click", function click(event) {
        if (!select.value) {
            alert("Choose an opponent");
            return;
        }
        !GAME_STARTED && startGame();
        if (select.value == "human") {
            makeMove(event.target, playerSymbol);
            playerSymbol = playerSymbol == "X" ? "O" : "X";
        }
    });
});
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", function (event) {
    var _a;
    GAME_STARTED = false;
    winner.style.display = "none";
    playerSymbol = result == "X" ? "O" : "X";
    result = "";
    console.log((_a = document.querySelector("player-active")) === null || _a === void 0 ? void 0 : _a.classList[0]);
    board = board.map(function (row) { return row.map(function () { return ""; }); });
    cells.forEach(function (cell) {
        cell.style.pointerEvents = "all";
        cell.querySelectorAll("svg").forEach(function (s) {
            s.style.display = "none";
            s.style.strokeDashoffset = s.classList.contains("X") ? "36" : "76";
        });
    });
    XDIV.style.pointerEvents = "all";
    ODIV.style.pointerEvents = "all";
    select.style.pointerEvents = "all";
});
