export interface ApiError {
  name: string;
  statusCode: number;
  description: string;
  isOperational: boolean;
  errorStack: string;
  logingErrorResponse: boolean;
}

export interface statusCode {
  OK: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  FORBIDDEN: number;
  NOT_FOUND: number;
  INTERNAL_ERROR: number;
}
