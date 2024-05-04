import { Router } from 'express';
import { bestPayedProfession, bestPayingClient } from '../controllers/admin';

const adminRouter: Router = Router();

adminRouter.get('/best-profession', bestPayedProfession);
adminRouter.get('/best-clients', bestPayingClient);

export default adminRouter;