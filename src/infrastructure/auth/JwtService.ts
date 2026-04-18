import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export class JwtService {
  static generateToken(payload: object): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as any });
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, env.JWT_SECRET);
  }
}
