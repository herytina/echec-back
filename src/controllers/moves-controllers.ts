// src/controllers/knightController.ts

import { Request, Response } from 'express';
import { getBishopMoves, getKingMoves, getKingRookMoves, getKnightMoves, getRookMoves } from '../functions/moves-functions';
import { getPawnMoves } from '../functions/pawns-moves-functions';

export const getKnightMovesController = (req: Request, res: Response): void => {
  const { row, col, isWhite, board } = req.body;
  if (typeof row !== 'number' || typeof col !== 'number' || typeof isWhite !== 'boolean' || !Array.isArray(board)) {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  const moves = getKnightMoves(row, col, isWhite, board);
  res.json({ moves });
};

export const getPawnsMovesController = (req: Request, res: Response): void => {
  const { row, col, isWhite, board, lastMove } = req.body;
  if (typeof row !== 'number' || typeof col !== 'number' || typeof isWhite !== 'boolean' || !Array.isArray(board)) {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }
  
  const moves = getPawnMoves(row, col, isWhite, board ,lastMove);
  res.json({ moves });
};

export const getBishopMovesController = (req: Request, res: Response): void => {
  const { row, col, isWhite, board } = req.body;
  if (typeof row !== 'number' || typeof col !== 'number' || typeof isWhite !== 'boolean' || !Array.isArray(board)) {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  const moves = getBishopMoves(row, col, isWhite, board);
  res.json({ moves });
};

export const getRookMovesController = (req: Request, res: Response): void => {
  const { row, col, isWhite, board } = req.body;
  if (typeof row !== 'number' || typeof col !== 'number' || typeof isWhite !== 'boolean' || !Array.isArray(board)) {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  const moves = getRookMoves(row, col, isWhite, board);
  res.json({ moves });
};

export const getKingMovesController = (req: Request, res: Response): void => {
  const { row, col, isWhite, board } = req.body;
  if (typeof row !== 'number' || typeof col !== 'number' || typeof isWhite !== 'boolean' || !Array.isArray(board)) {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  const moves = getKingMoves(row, col, isWhite, board);
  res.json({ moves });
};

export const getKingRookMovesController = (req: Request, res: Response): void => {
  const { row, col,direction,kingMoved, isWhite, board } = req.body;
  if (typeof row !== 'number' || typeof col !== 'number' || typeof isWhite !== 'boolean' || !Array.isArray(board)) {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  const moves = getKingRookMoves(row, col,direction,kingMoved, isWhite, board);
  res.json({ moves });
};
