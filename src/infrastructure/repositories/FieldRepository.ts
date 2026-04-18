import { IFieldRepository } from '../../application/interfaces/IFieldRepository';
import prisma from '../database/client';
import { Field, Stage } from '@prisma/client';

export class FieldRepository implements IFieldRepository {
  async create(data: { name: string; cropType: string; plantingDate: Date; assignedToId?: string }): Promise<Field> {
    return prisma.field.create({ data });
  }

  async findById(id: string): Promise<Field | null> {
    return prisma.field.findUnique({
      where: { id },
      include: { assignedTo: { select: { id: true, email: true } } },
    });
  }

  async findAll(): Promise<Field[]> {
    return prisma.field.findMany({
      include: { assignedTo: { select: { id: true, email: true } } },
    });
  }

  async findAllByAgent(agentId: string): Promise<Field[]> {
    return prisma.field.findMany({
      where: { assignedToId: agentId },
      include: { assignedTo: { select: { id: true, email: true } } },
    });
  }

  async update(id: string, data: Partial<Field>): Promise<Field> {
    return prisma.field.update({
      where: { id },
      data,
      include: { assignedTo: { select: { id: true, email: true } } },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.field.delete({ where: { id } });
  }
}
