export const isOnBoard = (x:number, y:number)=> {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

export const isOpponentPiecePawn = (row: number, col: number, isWhite: boolean, board: string[][])=> {
      const piece = board[row][col];
      return piece !== '' && (isWhite ? piece.toLowerCase() === piece : piece.toUpperCase() === piece);
}

export const getPawnMoves = (row: number, col: number, isWhite: boolean, board: string[][], lastMove: { from: [number, number], to: [number, number] }) => {
   // Get valid moves for a pawn

      const moves = [];
      const direction = isWhite ? 1 : -1;
      const startRow = isWhite ? 1 : 6;

     // Move forward one square
      if (isOnBoard(row + direction, col) && board[row + direction][col] === '') {
        moves.push([row + direction, col]);
        // Move forward two squares from start position
        if (row === startRow && board[row + 2 * direction][col] === '' && board[row + direction][col] === '') {
          moves.push([row + 2 * direction, col]);
        }
      }
      // Capture diagonally left
      if (isOnBoard(row + direction, col - 1) && isOpponentPiecePawn(row + direction, col - 1, isWhite, board)) {
        moves.push([row + direction, col - 1]);
      }

      // Capture diagonally right
      if (isOnBoard(row + direction, col + 1) && isOpponentPiecePawn(row + direction, col + 1, isWhite, board)) {
        moves.push([row + direction, col + 1]);
      }

      // Règle en passant
      if (lastMove) {
        const [lastFromRow, lastFromCol] = lastMove.from;
        const [lastToRow, lastToCol] = lastMove.to;
        // Vérifiez si le dernier mouvement était un déplacement de deux cases pour un pion adverse
        if (Math.abs(lastFromRow - lastToRow) === 2 && board[lastToRow][lastToCol].toLowerCase() === 'p') {
          // Vérifiez si le pion adverse est à côté de notre pion
          if (lastToRow === row && Math.abs(lastToCol - col) === 1) {
            // Capture en passant
            if (Math.abs(lastToCol - lastFromCol) !== 1 && board[lastToRow][lastToCol].toLowerCase() === 'p') {
              setTimeout(()=>{
                if(board[lastFromRow - direction][lastFromCol].toLowerCase() === ''){
                  board[lastToRow][lastToCol] = ''; // Retirer le pion capturé
                }
              }, 1000)
            }
            moves.push([row + direction, lastToCol]);
          }
        }
      }
      return moves;
}
