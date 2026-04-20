import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../application/interfaces/IUserRepository';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async getAllUsers() {
    return this.userRepository.findAll();
  }
}
