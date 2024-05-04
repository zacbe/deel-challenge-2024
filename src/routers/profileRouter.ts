import { Router } from 'express';
import { addBalance } from '../controllers/profiles';
import { getProfile, parseInteger } from '../middleware';

const profileRouter: Router = Router()
profileRouter.post('/deposit/:userId', getProfile, parseInteger, addBalance)

export default profileRouter;