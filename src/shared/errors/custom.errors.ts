import { AppError } from './AppError';

export class EmailAlreadyInUseError extends AppError {
  constructor(message: string = 'Email already in use') {
    super(message, 409); // 409 Conflict
    this.name = 'EmailAlreadyInUseError';
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message: string = 'Invalid credentials') {
    super(message, 401); // 401 Unauthorized
    this.name = 'InvalidCredentialsError';
  }
}

export class FieldNotFoundError extends AppError {
  constructor(message: string = 'Field not found') {
    super(message, 404); // 404 Not Found
    this.name = 'FieldNotFoundError';
  }
}

export class AuthenticationRequiredError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401); // 401 Unauthorized
    this.name = 'AuthenticationRequiredError';
  }
}

export class InsufficientPermissionsError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403); // 403 Forbidden
    this.name = 'InsufficientPermissionsError';
  }
}

export class TokenError extends AppError {
  constructor(message: string = 'Token error') {
    super(message, 401); // 401 Unauthorized
    this.name = 'TokenError';
  }
}
