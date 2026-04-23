import { FieldInterface, Stage, UpdateFieldDTO } from "../dtos/field.dto";
import { FieldStatus } from "../../domain/enums/FieldStatus";

export interface IFieldRepository {
  create(data: {
    name: string;
    cropType: string;
    plantingDate: Date;
    assignedToId?: string;
  }): Promise<FieldInterface>;
  findById(id: string): Promise<FieldInterface | null>;
  findAll(): Promise<FieldInterface[]>;
  findAllByAgent(agentId?: string): Promise<FieldInterface[]>;
  update(id: string, data: UpdateFieldDTO): Promise<FieldInterface>;
  updateStatus(id: string, status: FieldStatus): Promise<FieldInterface>;
  delete(id: string): Promise<void>;
}
