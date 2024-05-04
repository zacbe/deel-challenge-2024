import createError from "http-errors";
import { Request, Response, NextFunction } from 'express';
import { findContractById } from "../../services/contractService";

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const contractId = req.params?.id;
  const profileId = req.profile?.id
  const { Contract } = req.app.get("models");

  try {

    const contract = await findContractById(contractId, profileId, Contract);
    if (!contract) {
      return next(createError(404, "Contract not found"));
    }
    res.json({ contract });
  } catch (e) {
    next(e);
  }
}
