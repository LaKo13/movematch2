import express from 'express';
import { getProfile, updateProfile, updatePassword } from '../controllers/user.controller.js';
import { auth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { updateProfileSchema, updatePasswordSchema } from '../schemas/user.schema.js';

const router = express.Router();

router.use(auth);

router.get('/profile', getProfile);
router.put('/profile', validateRequest(updateProfileSchema), updateProfile);
router.put('/password', validateRequest(updatePasswordSchema), updatePassword);

export default router;