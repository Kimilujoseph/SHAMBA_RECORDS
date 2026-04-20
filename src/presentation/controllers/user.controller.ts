import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../application/services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

