import { Request, Response, NextFunction } from 'express';
import { getUserBySubdomain } from '../services/methodsDB';

const reservedSubdomains = ['blog', 'api'];

export const subdomainMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const host = req.headers.host;
  const subdomain = host?.split('.')[0];

  if (reservedSubdomains.includes(subdomain)) {
    return next();
  }

  try {
    const user = await getUserBySubdomain(subdomain);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
