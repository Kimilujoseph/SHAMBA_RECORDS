import { Request, Response, NextFunction } from "express";
import { Role } from "../../domain/enums/Role";
import { AppError } from "../../shared/errors/AppError";

export const authorizeFieldView = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;
    const field = (req as any).field;

    if (!userId || !userRole) {
      throw new AppError("Authentication required", 401);
    }

    if (userRole === Role.ADMIN) {
      return next();
    }

    if (userRole === Role.AGENT) {
      const assignedToId = field.assignedTo?.id;

      if (assignedToId !== userId) {
        throw new AppError(
          "Unauthorized: Field not assigned to this agent",
          403
        );
      }

      return next();
    }

    throw new AppError("Unauthorized: Insufficient permissions", 403);
  } catch (error) {
    next(error);
  }
};
