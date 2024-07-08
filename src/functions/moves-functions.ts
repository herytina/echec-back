import { IKingRook } from "../models/IKingRook";

export const getKnightMoves = (row: number, col: number, isWhite: boolean, board: string[][]): number[][] => {
  const moves: number[][] = [];
  const knightMoves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];

  for (const [dx, dy] of knightMoves) {
    const x = row + dx;
    const y = col + dy;
    if (x >= 0 && x < 8 && y >= 0 && y < 8 && (board[x][y] === '' || (board[x][y].toUpperCase() !== board[x][y] === isWhite))) {
      moves.push([x, y]);
    }
  }

  return moves;
};

export const getBishopMoves = (row: number, col: number, isWhite: boolean, board: string[][]): number[][] => {
      const moves: number[][] = [];
      // Diagonal directions
      const directions: number[][] = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

      for (const [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;
        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
          if (board[x][y] === '') {
            moves.push([x, y]);
          } else {
            if (board[x][y].toUpperCase() !== board[x][y] === isWhite) {
              moves.push([x, y]);
            }
            break;
          }
          x += dx;
          y += dy;
        }
      }

      return moves;
};

export const getRookMoves = (row: number, col: number, isWhite: boolean, board: string[][]): number[][] => {
      const moves: number[][] = [];
      // Vertical and horizontal directions
      const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

      for (const [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;
        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
          if (board[x][y] === '') {
            moves.push([x, y]);
          } else {
            if (board[x][y].toUpperCase() !== board[x][y] === isWhite) {
              moves.push([x, y]);
            }
            break;
          }
          x += dx;
          y += dy;
        }
      }

      return moves;
};

export const getKingMoves = (row: number, col: number, isWhite: boolean, board: string[][]): number[][] => {
      const moves: number[][] = [];
      const kingMoves = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
      ];

      for (const [dx, dy] of kingMoves) {
        const x = row + dx;
        const y = col + dy;
        if (x >= 0 && x < 8 && y >= 0 && y < 8 && (board[x][y] === '' || board[x][y].toUpperCase() !== board[x][y] === isWhite)) {
          moves.push([x, y]);
        }
      }
      return moves;
};

export const getKingRookMoves = (row: number, col: number, direction:number, kingMoved:IKingRook, isWhite: boolean, board: string[][]): number[][] => {
      const moves: number[][] = [];
      if (isWhite && !kingMoved.white || !isWhite && !kingMoved.black) {
        for (let i = 1; i < 3; i++) {
        const x = row;
        const y = col + i * direction;
          while (x === 0 || x === 7) {
            if (board[x][y] === '') {
              moves.push([x, y]);
              break;
            } else {
              if (board[x][col].toUpperCase() !== board[x][y]) {
                moves.push([x, y]);
              }
              break;
            }
          }
        }
      }
      isWhite ? kingMoved.white = true : kingMoved.black = true;
      return moves;
};
