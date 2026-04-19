import { Request, Response, NextFunction } from "express";

import { AppError } from "../../shared/errors/AppError";
import { FieldService } from "../../application/services/FieldService";
export const loadField =
  (fieldService: FieldService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fieldId = req.params.id;

      const field = await fieldService.getById(fieldId);
      if (!field) {
        throw new AppError("Field not found", 404);
      }

      // attach to request
      (req as any).field = field;

      next();
    } catch (error) {
      next(error);
    }
  };
