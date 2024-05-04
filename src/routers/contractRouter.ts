
import { Router } from 'express';
import { findAll, findOne } from '../controllers/contracts';
import { getProfile } from '../middleware';

const contractRouter: Router = Router();

contractRouter.get('/', getProfile, findAll);
contractRouter.get('/:id', getProfile, findOne);

export default contractRouter;
