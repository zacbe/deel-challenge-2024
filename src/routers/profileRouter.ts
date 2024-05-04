import { Router } from 'express';
import { addBalance } from '../controllers/profiles';
import { getProfile } from '../middleware';

const profileRouter: Router = Router()
profileRouter.post('/deposit/:userId', getProfile, addBalance)

export default profileRouter;