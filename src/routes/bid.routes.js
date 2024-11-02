import express from 'express';
import { createBid, acceptBid } from '../controllers/bid.controller.js';
import { auth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createBidSchema } from '../schemas/bid.schema.js';

const router = express.Router();

router.use(auth);

router.post('/', validateRequest(createBidSchema), createBid);
router.post('/:id/accept', acceptBid);

export default router;