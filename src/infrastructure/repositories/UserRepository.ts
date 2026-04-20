import { IUserRepository } from '../../application/interfaces/IUserRepository';
import prisma from '../database/client';
import { User } from '@prisma/client';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: { email: string; password: string; role?: 'ADMIN' | 'AGENT' }): Promise<User> {
    return prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }
}

