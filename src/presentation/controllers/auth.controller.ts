import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../application/services/AuthService";
import { RegisterDto, LoginDto } from "../../application/dtos/auth.dto";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: RegisterDto = req.body;
      const result = await this.authService.register(dto);
      res.status(201).json(result);
    } catch (err: any) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: LoginDto = req.body;
      const result = await this.authService.login(dto, res);
      res.json(result.user);
    } catch (err: any) {
      next(err);
    }
  };
}
