import { IFieldRepository } from '../interfaces/IFieldRepository';
import { CreateFieldDto, UpdateFieldDto, FieldResponseDto } from '../dtos/field.dto';
import { computeFieldStatus } from '../../domain/logic/field-status.logic';
import { Stage } from '../../domain/enums/Stage';
import { FieldNotFoundError, InsufficientPermissionsError } from '../../shared/errors/custom.errors';

export class FieldService {
  constructor(private fieldRepository: IFieldRepository) {}

  private async recomputeAndSaveStatus(fieldId: string, stage: Stage, plantingDate: Date): Promise<void> {
    const status = computeFieldStatus(stage, plantingDate);
    await this.fieldRepository.update(fieldId, { status });
  }

  async create(dto: CreateFieldDto): Promise<FieldResponseDto> {
    const plantingDate = new Date(dto.plantingDate);
    const field = await this.fieldRepository.create({
      name: dto.name,
      cropType: dto.cropType,
      plantingDate,
      assignedToId: dto.assignedToId,
    });

    await this.recomputeAndSaveStatus(field.id, field.stage as Stage, plantingDate);
    const updatedField = await this.fieldRepository.findById(field.id);
    return this.toResponseDto(updatedField!);
  }

  async update(id: string, dto: UpdateFieldDto, userId?: string, userRole?: string): Promise<FieldResponseDto> {
    const field = await this.fieldRepository.findById(id);
    if (!field) throw new FieldNotFoundError();

    // Authorization: Agents can only update stage/notes on assigned fields
    if (userRole === 'AGENT') {
      if (field.assignedToId !== userId) {
        throw new InsufficientPermissionsError('You can only update your own assigned fields');
      }
      // Agents can only modify stage and notes
      const allowedUpdates: (keyof UpdateFieldDto)[] = ['stage', 'notes'];
      const attemptedUpdates = Object.keys(dto) as (keyof UpdateFieldDto)[];
      for (const key of attemptedUpdates) {
        if (!allowedUpdates.includes(key)) {
          throw new InsufficientPermissionsError(`Agents cannot modify field: ${key}`);
        }
      }
    }

    const updateData: any = { ...dto };
    if (dto.plantingDate) updateData.plantingDate = new Date(dto.plantingDate);

    const stageChanged = dto.stage && dto.stage !== field.stage;
    const plantingDateChanged = dto.plantingDate && new Date(dto.plantingDate).getTime() !== field.plantingDate.getTime();

    const updatedField = await this.fieldRepository.update(id, updateData);

    if (stageChanged || plantingDateChanged) {
      const currentStage = (dto.stage as Stage) || (field.stage as Stage);
      const currentPlantingDate = dto.plantingDate ? new Date(dto.plantingDate) : field.plantingDate;
      await this.recomputeAndSaveStatus(id, currentStage, currentPlantingDate);
    }

    const finalField = await this.fieldRepository.findById(id);
    return this.toResponseDto(finalField!);
  }

  async getById(id: string): Promise<FieldResponseDto> {
    const field = await this.fieldRepository.findById(id);
    if (!field) throw new FieldNotFoundError();
    return this.toResponseDto(field);
  }

  async getAll(agentId?: string): Promise<FieldResponseDto[]> {
    const fields = agentId
      ? await this.fieldRepository.findAllByAgent(agentId)
      : await this.fieldRepository.findAll();
    return fields.map(f => this.toResponseDto(f));
  }

  async delete(id: string): Promise<void> {
    const field = await this.fieldRepository.findById(id);
    if (!field) throw new FieldNotFoundError();
    await this.fieldRepository.delete(id);
  }

  private toResponseDto(field: any): FieldResponseDto {
    return {
      id: field.id,
      name: field.name,
      cropType: field.cropType,
      plantingDate: field.plantingDate,
      stage: field.stage,
      notes: field.notes,
      status: field.status,
      assignedTo: field.assignedTo ? { id: field.assignedTo.id, email: field.assignedTo.email } : null,
      createdAt: field.createdAt,
      updatedAt: field.updatedAt,
    };
  }
}
