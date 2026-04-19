import { IFieldRepository } from "../../application/interfaces/IFieldRepository";
import { UpdateFieldDTO } from "../../application/dtos/field.dto";
import prisma from "../database/client";
import { Field, Prisma } from "@prisma/client";
import { FieldStatus } from "../../domain/enums/FieldStatus";

export class FieldRepository implements IFieldRepository {
  async create(data: {
    name: string;
    cropType: string;
    plantingDate: Date;
    assignedToId?: string;
  }): Promise<Field> {
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

  async update(id: string, dto: UpdateFieldDTO): Promise<Field> {
    const updateData: Prisma.FieldUpdateInput = { ...dto };

    if (dto.plantingDate) {
      updateData.plantingDate = new Date(dto.plantingDate);
    }

    return prisma.field.update({
      where: { id },
      data: updateData,
      include: {
        assignedTo: { select: { id: true, email: true } },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.field.delete({ where: { id } });
  }

  async updateStatus(id: string, status: FieldStatus): Promise<Field> {
    return prisma.field.update({
      where: { id },
      data: { status },
    });
  }
}
