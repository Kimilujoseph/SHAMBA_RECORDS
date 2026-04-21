import { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/errors/AppError";
import { Role } from "../../domain/enums/Role";

export const authorizeProfileView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestingUserId = req.user?.id;
    const requestingUserRole = req.user?.role;
    const profileId = req.params.id;

    if (!requestingUserId || !requestingUserRole) {
      throw new AppError("Authentication required", 401);
    }

    // Admins can view any profile
    if (requestingUserRole === Role.ADMIN) {
      return next();
    }

    // Users can view their own profile
    if (requestingUserId === profileId) {
      return next();
    }

    throw new AppError(
      "Unauthorized: Insufficient permissions to view this profile",
      403
    );
  } catch (error) {
    next(error);
  }
};
