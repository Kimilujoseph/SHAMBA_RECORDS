import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../infrastructure/auth/JwtService';
import { AuthenticationRequiredError, TokenError } from '../../shared/errors/custom.errors';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies?.jwt; // Try to get token from cookie

  if (!token) {
    // If no token in cookie, fallback to Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const parts = authHeader.split(' ');
      if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
        token = parts[1];
      }
    }
  }

  if (!token) {
    throw new AuthenticationRequiredError('No token provided');
  }

  try {
    const decoded = JwtService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AuthenticationRequiredError('Invalid token');
  }
};
