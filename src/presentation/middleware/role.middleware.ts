import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/errors/AppError';
import { Role } from '../../domain/enums/Role';

export const requireRole = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }
    if (req.user.role !== role) {
      throw new AppError('Insufficient permissions', 403);
    }
    next();
  };
};
