import { Request, Response, NextFunction } from 'express';
import { findAllUnpaidJobsByProfile } from '../../services/jobService';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const models = req.app.get("models");
  const profileId = req.profile?.id

  try {
    const jobs = await findAllUnpaidJobsByProfile(profileId, models);
    res.json({ jobs });
  } catch (e) {
    next(e);
  }

}

