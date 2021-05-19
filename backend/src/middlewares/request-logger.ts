import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.log(
    'request',
    `IP: ${req.ip} METHOD: ${req.method} URL: ${req.url} BODY: ${JSON.stringify(
      req.body
    )}`
  );

  next();
};

export default loggerMiddleware;
