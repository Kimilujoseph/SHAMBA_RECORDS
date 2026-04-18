import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { AuthService } from '../../application/services/AuthService';

const router = Router();
const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const controller = new AuthController(authService);

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);

export default router;
