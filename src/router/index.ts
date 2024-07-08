// src/routes.ts

import { Router } from 'express';
import { loginControllers } from '../controllers/login-controllers';
import { getBishopMovesController, getKingMovesController, getKingRookMovesController, getKnightMovesController, getPawnsMovesController, getRookMovesController } from '../controllers/moves-controllers';
import { createParty, deleteParty, getParties, getPartyById, updateParty } from '../controllers/partyController';

const router = Router();

router.post('/api/knight-moves', getKnightMovesController);
router.post('/api/pawns-moves', getPawnsMovesController);
router.post('/api/bishop-moves', getBishopMovesController);
router.post('/api/rook-moves', getRookMovesController);
router.post('/api/king-moves', getKingMovesController);
router.post('/api/king-to-rook', getKingRookMovesController);

router.post('/api/login', loginControllers);

// api pour la partie
router.get('/api/getAllParty', getParties);
router.get('/api/getPartyId/:id', getPartyById);
router.post('/api/createParty', createParty);
router.put('/api/updateParty/:id', updateParty);
router.delete('/api/deleteParty/:id', deleteParty);
export default router;
