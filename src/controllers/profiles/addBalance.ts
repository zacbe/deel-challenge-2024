
import { Request, Response, NextFunction } from 'express';


export default async function handler(_req: Request, res: Response, _next: NextFunction): Promise<void> {
  res.json({ message: 'Add Balance' });
}
