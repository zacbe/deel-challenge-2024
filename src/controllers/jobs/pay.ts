import { Request, Response, NextFunction } from 'express';
import { processJobPaymentById } from '../../services/jobService';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const sequelize = req.app.get("sequelize");
  const models = req.app.get("models");
  const profileId = req.profile?.id
  const jobId = req.params?.job_id;

  try {
    await processJobPaymentById(jobId, profileId, { ...models, sequelize });
    res.json({ message: "Successful Payment", });
  } catch (e) {
    next(e);
  }
}

