import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { findActiveContracts } from '../../services/contractService';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {

  const { Contract } = req.app.get("models");
  const profileId = req.profile?.id

  try {
    const contracts = await findActiveContracts(profileId, Contract);
    if (!contracts || contracts.length === 0) {
      return next(createError(404, "Contracts not found"));
    }
    res.json({ contracts });
  } catch (e) {
    next(e);
  }
};
