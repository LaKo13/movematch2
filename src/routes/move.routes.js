import express from 'express';
import { createMove, getMove, getUserMoves } from '../controllers/move.controller.js';
import { auth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createMoveSchema } from '../schemas/move.schema.js';

const router = express.Router();

router.use(auth);

router.post('/', validateRequest(createMoveSchema), createMove);
router.get('/user', getUserMoves);
router.get('/:id', getMove);

export default router;