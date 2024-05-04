import { Request, Response, NextFunction } from 'express'

const parseInteger = (req: Request, res: Response, next: NextFunction) => {
  const amount = req.body.amount;

  if (isNaN(amount)) {
    return res.status(400).json({ message: "Invalid amount format" })
  }
  const depositAmount = parseInt(req.body.amount, 10);
  req.body.amount = depositAmount;
  next();
};

export default parseInteger;