"use strict";
// let scores = {
//   X: 1,
//   O: -1,
//   draw: 0,
// };
function minimax(board, depth, isMaximizing) {
    // checkWinner()
    // if (result == "X" || result == "O") {
    //   let score = scores[result];
    //   return score;
    // }
    if (isMaximizing) {
        var bestScore = Number.NEGATIVE_INFINITY;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    board[i][j] = "X";
                    bestScore = Math.max(bestScore, minimax(board, depth + 1, !isMaximizing));
                    // let score = minimax(board, depth + 1, !isMaximizing);
                    board[i][j] = "";
                    // bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    }
    else {
        var bestScore = Number.POSITIVE_INFINITY;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    board[i][j] = "O";
                    bestScore = Math.min(bestScore, minimax(board, depth + 1, !isMaximizing));
                    // let score = minimax(board, depth + 1, !isMaximizing);
                    board[i][j] = "";
                    // bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}
function bestMove(cells, board) {
    currentPlayer = "computer";
    var bestScore = Number.NEGATIVE_INFINITY;
    var move = { i: -1, j: -1 };
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == "") {
                board[i][j] = "X";
                var score = minimax(board, 0, false);
                board[i][j] = "";
                if (score > bestScore) {
                    move = { i: i, j: j };
                    bestScore = score;
                }
            }
        }
    }
    // if (move !== undefined) {
    board[move.i][move.j] = "X";
    cells.forEach(function (cell) {
        var _a;
        var row = Number((_a = cell.parentElement) === null || _a === void 0 ? void 0 : _a.classList[1].replace("row", "")) * 1 - 1;
        var column = Number(cell.classList[1].replace("cell", "")) * 1 - 1;
        if (row == (move === null || move === void 0 ? void 0 : move.i) && column == (move === null || move === void 0 ? void 0 : move.j)) {
            cell.innerHTML = XSVG;
            var svg_1 = cell.querySelector(".X");
            svg_1.style.display = "block";
            setTimeout(function () {
                svg_1.style.strokeDashoffset = "0";
            }, 100);
        }
    });
    console.log("board on minimax.js ".concat(board));
    // }
}
