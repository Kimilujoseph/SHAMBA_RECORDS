import { STATUS_CODE, APIError } from "./app-error";
import { Request, Response, NextFunction } from "express";

const ErrorHandler = (
  err: APIError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);
  const statusCode = (err as APIError).statusCode || STATUS_CODE.INTERNAL_ERROR;
  const message = err.message || "Internal Server Error";

  // Send the error response
  res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
};
export { ErrorHandler };
