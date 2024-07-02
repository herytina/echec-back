// src/routes.ts

import { Router } from 'express';
import { getKnightMovesController, test } from '../controllers/moves';
import { createParty, deleteParty, getParties, getPartyById, updateParty } from '../controllers/partyController';

const router = Router();

router.post('/api/knight-moves', getKnightMovesController);
router.get('/api/test', test)

router.get('/api/getAllParty', getParties);
router.get('/api/getPartyId/:id', getPartyById);
router.post('/api/createParty', createParty);
router.put('/api/updateParty/:id', updateParty);
router.delete('/api/deleteParty/:id', deleteParty);
export default router;
