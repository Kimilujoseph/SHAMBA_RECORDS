import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../infrastructure/auth/JwtService';
import { AuthenticationRequiredError, TokenError } from '../../shared/errors/custom.errors';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AuthenticationRequiredError('No token provided');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    throw new TokenError('Token error');
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    throw new TokenError('Token malformatted');
  }

  try {
    const decoded = JwtService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AuthenticationRequiredError('Invalid token');
  }
};
