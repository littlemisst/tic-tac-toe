interface Move {
  i: number;
  j: number;
}


// let scores = {
//   X: 1,
//   O: -1,
//   draw: 0,
// };

function minimax(board: string[][], depth: number, isMaximizing: boolean) {
  // checkWinner()
  // if (result == "X" || result == "O") {
  //   let score = scores[result];
  //   return score;
  // }

  if (isMaximizing) {
    let bestScore = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = "X";
          bestScore = Math.max(bestScore, minimax(board, depth + 1, !isMaximizing))
          // let score = minimax(board, depth + 1, !isMaximizing);
          board[i][j] = "";
          // bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Number.POSITIVE_INFINITY;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = "O";
          bestScore = Math.min(bestScore, minimax(board, depth+1, !isMaximizing))
          // let score = minimax(board, depth + 1, !isMaximizing);
          board[i][j] = "";
          // bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}



function bestMove(cells: NodeListOf<HTMLElement>, board: string[][]) {
  
  currentPlayer = "computer";

  let bestScore = Number.NEGATIVE_INFINITY;
  let move: Move = { i: -1, j: -1 };

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {

        board[i][j] = "X";

        let score = minimax(board, 0, false);

        board[i][j] = "";

        if (score > bestScore) {

          move = { i, j };

          bestScore = score;
        }
      }
    }
  }


  // if (move !== undefined) {
  board[move.i][move.j] = "X";

  cells.forEach((cell: HTMLElement) => {
    let row =
      Number(cell.parentElement?.classList[1].replace("row", "")) * 1 - 1;
    let column = Number(cell.classList[1].replace("cell", "")) * 1 - 1;

    if (row == move?.i && column == move?.j) {
      cell.innerHTML = XSVG;
      let svg = cell.querySelector(".X") as HTMLElement;

      svg.style.display = "block";

      setTimeout(() => {
        svg.style.strokeDashoffset = "0";
      }, 100);
    }
  });

  console.log(`board on minimax.js ${board}`);

  // }

}