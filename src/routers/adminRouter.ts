import { Router } from 'express';
import { bestPayedProfession, bestPayingClient } from '../controllers/admin';
import { queryParams } from '../middleware';

const adminRouter: Router = Router();

adminRouter.get('/best-profession', queryParams, bestPayedProfession);
adminRouter.get('/best-clients', queryParams, bestPayingClient);

export default adminRouter;