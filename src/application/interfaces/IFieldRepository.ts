import { FieldInterface, Stage, UpdateFieldDTO } from "../dtos/field.dto";

export interface IFieldRepository {
  create(data: {
    name: string;
    cropType: string;
    plantingDate: Date;
    assignedToId?: string;
  }): Promise<FieldInterface>;
  findById(id: string): Promise<FieldInterface | null>;
  findAll(): Promise<FieldInterface[]>;
  findAllByAgent(agentId: string): Promise<FieldInterface[]>;
  update(id: string, data: UpdateFieldDTO): Promise<FieldInterface>;
  delete(id: string): Promise<void>;
}
