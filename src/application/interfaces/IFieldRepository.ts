import { Field, Stage } from '@prisma/client';

export interface IFieldRepository {
  create(data: { name: string; cropType: string; plantingDate: Date; assignedToId?: string }): Promise<Field>;
  findById(id: string): Promise<Field | null>;
  findAll(): Promise<Field[]>;
  findAllByAgent(agentId: string): Promise<Field[]>;
  update(id: string, data: Partial<{ name: string; cropType: string; plantingDate: Date; stage: Stage; notes: string; status: string; assignedToId: string | null }>): Promise<Field>;
  delete(id: string): Promise<void>;
}
