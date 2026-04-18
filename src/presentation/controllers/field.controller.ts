import { Request, Response } from "express";
import { FieldService } from "../../application/services/FieldService";
import {
  CreateFieldDto,
  UpdateFieldDto,
} from "../../application/dtos/field.dto";

export class FieldController {
  constructor(private fieldService: FieldService) {}

  create = async (req: Request, res: Response) => {
    const dto: CreateFieldDto = req.body;
    const field = await this.fieldService.create(dto);
    res.status(201).json(field);
  };

  getAll = async (req: Request, res: Response) => {
    const agentId = req.user?.role === "AGENT" ? req.user.id : undefined;
    const fields = await this.fieldService.getAll(agentId);
    res.json(fields);
  };

  getOne = async (req: Request, res: Response) => {
    const field = await this.fieldService.getById(req.params.id);
    res.json(field);
  };

  update = async (req: Request, res: Response) => {
    const dto: UpdateFieldDto = req.body;
    const field = await this.fieldService.update(
      req.params.id,
      dto,
      req.user?.id,
      req.user?.role
    );
    res.json(field);
  };

  delete = async (req: Request, res: Response) => {
    await this.fieldService.delete(req.params.id);
    res.status(204).send();
  };
}
