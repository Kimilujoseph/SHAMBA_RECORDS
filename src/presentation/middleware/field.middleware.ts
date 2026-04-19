import { Request, Response, NextFunction } from "express";
import { FieldRepository } from "../../infrastructure/repositories/FieldRepository";
import { FieldService } from "../../application/services/FieldService";
import { Role } from "../../domain/enums/Role";
import { AppError } from "../../shared/errors/AppError";

// Initialize FieldService outside to reuse the instance
const fieldRepository = new FieldRepository();
const fieldService = new FieldService(fieldRepository);

export const authorizeFieldModification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fieldId = req.params.id;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId || !userRole) {
      throw new AppError("Authentication required", 401);
    }

    const field = await fieldService.getById(fieldId); // Assuming getOne fetches field details
    if (!field) {
      throw new AppError("Field not found", 404);
    }

    if (userRole === Role.ADMIN) {
      return next();
    }

    if (userRole === Role.AGENT) {
      // Agents can only update fields assigned to them
      const assignedToId = field.assignedTo?.id;
      if (assignedToId !== userId) {
        throw new AppError(
          "Unauthorized: Field not assigned to this agent",
          403
        );
      }

      const allowedUpdates = ["stage", "notes"];
      const updates = Object.keys(req.body);
      const isAgentTryingToUpdateOtherFields = updates.some(
        (update) => !allowedUpdates.includes(update)
      );

      if (isAgentTryingToUpdateOtherFields) {
        throw new AppError(
          "Unauthorized: Agents can only update stage and notes",
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
