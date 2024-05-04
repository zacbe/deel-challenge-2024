import { Request, Response, NextFunction } from 'express';
import { getBestPayedProfession } from "../../services/profileService";

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const models = req.app.get("models");
  const { start, end } = req.query;

  try {
    const profession = await getBestPayedProfession(String(start), String(end), models);
    res.json({ profession });
  } catch (e) {
    next(e);
  }
}