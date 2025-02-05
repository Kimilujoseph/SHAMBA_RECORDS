import { ApiError, statusCode } from "./error-interface";


//this really confuses but here is brief expenation of whats going on
//am trying to create a custom error handling called AppError
//normally we handle error as new Error("")
//with extend am inherinting the built in js Error
class AppError extends Error implements ApiError {
  name: string;
  statusCode: number;
  description: string;
  isOperational: boolean;
  errorStack: string;
  logingErrorResponse: boolean;

  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational = true,
    errorStack = "",
    logingErrorResponse = false
  ) {
    super(description);//it will call the parent class Error() and pass the message right??
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.description = description;
    this.logingErrorResponse = logingErrorResponse;

    //It captures a stack trace (a record of the function call hierarchy)
    //at the point where the error was instantiated.
    Error.captureStackTrace(this);
  }
}

class APIError extends AppError {
  constructor(
    name: string,
    statusCode = 500,
    description = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

const STATUS_CODE: statusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export { AppError, APIError, STATUS_CODE };
