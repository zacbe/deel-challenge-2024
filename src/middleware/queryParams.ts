import { Request, Response, NextFunction } from 'express'


function isValidDate(date: any): boolean {
  return !isNaN(Date.parse(date));
}

function isValidInteger(value: any): boolean {
  const num = parseInt(value, 10);
  return !isNaN(num) && num >= 0;
}

const queryParams = (req: Request, res: Response, next: NextFunction) => {
  const { start, end, limit } = req.query;

  if (!start || !end) {
    return res.status(400).json({ message: 'Invalid parameters' });
  }

  if (!isValidDate(start) || !isValidDate(end)) {
    return res.status(400).json({ message: 'Invalid date format. Please use YYYY-MM-DD.' });
  }

  if (limit && !isValidInteger(limit)) {
    return res.status(400).json({ message: 'Limit must be a valid integer.' });
  }

  next();
};

export default queryParams;