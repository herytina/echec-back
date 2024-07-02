// src/controllers/knightController.ts

import { Request, Response } from 'express';

const getKnightMoves = (row: number, col: number, isWhite: boolean, board: string[][]): number[][] => {
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

export const getKnightMovesController = (req: Request, res: Response): void => {
  const { row, col, isWhite, board } = req.body;
  if (typeof row !== 'number' || typeof col !== 'number' || typeof isWhite !== 'boolean' || !Array.isArray(board)) {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  const moves = getKnightMoves(row, col, isWhite, board);
  console.log("🚀 ~ moves:", moves)
  res.json({ moves });
};

export const test = (req: Request, res: Response):void => {
  console.log("🚀 ~ test:", test)
  res.json('reusie')
}
