import { Request, Response, NextFunction } from 'express';
import createError from "http-errors";
import { updateClientBalance } from '../../services/profileService';

export default async function handler(req: Request, res: Response, next: NextFunction) {
  const sequelize = req.app.get("sequelize");
  const models = req.app.get("models");
  const profileId = req.profile?.id
  const { userId } = req.params;
  const depositAmount = req.body.amount

  try {
    if (profileId?.toString() !== userId) {
      return next(createError(400, "Invalid user"));
    }
    await updateClientBalance(userId, depositAmount, { ...models, sequelize });
    return res.json({ message: "Successful Deposit" });
  } catch (e) {
    next(e);
  }
}


