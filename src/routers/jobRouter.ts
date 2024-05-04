import { Router } from 'express';
import { pay, findUnpaid } from '../controllers/jobs';
import { getProfile } from '../middleware';

const jobRouter: Router = Router();

jobRouter.get('/unpaid', getProfile, findUnpaid);
jobRouter.post('/:job_id/pay', getProfile, pay);

export default jobRouter;