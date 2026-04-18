import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validate = (schema: ZodObject<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.flatten();

        res.status(400).json({
          message: "Validation failed",
          errors: formattedErrors.fieldErrors,
        });
        return;
      }
      next(error);
    }
  };
};
