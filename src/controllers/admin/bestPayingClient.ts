import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { getBestPayingClients } from "../../services/profileService";

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const models = req.app.get("models");
  const { start, end, limit = 2 } = req.query;

  if (!start || !end) return next(createError(400, "Invalid parameters"));

  try {
    const clients = await getBestPayingClients(String(start), String(end), Number(limit), models);
    res.json({ clients });
  } catch (e) {
    next(e);
  }
}


