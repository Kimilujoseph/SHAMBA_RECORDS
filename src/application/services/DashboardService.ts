import { IFieldRepository } from '../interfaces/IFieldRepository';
import { FieldStatus } from '../../domain/enums/FieldStatus';

export class DashboardService {
  constructor(private fieldRepository: IFieldRepository) {}

  async getAdminSummary() {
    const fields = await this.fieldRepository.findAll();
    const total = fields.length;
    const byStatus = {
      [FieldStatus.ACTIVE]: fields.filter(f => f.status === FieldStatus.ACTIVE).length,
      [FieldStatus.AT_RISK]: fields.filter(f => f.status === FieldStatus.AT_RISK).length,
      [FieldStatus.COMPLETED]: fields.filter(f => f.status === FieldStatus.COMPLETED).length,
    };
    const byStage = {
      PLANTED: fields.filter(f => f.stage === 'PLANTED').length,
      GROWING: fields.filter(f => f.stage === 'GROWING').length,
      READY: fields.filter(f => f.stage === 'READY').length,
      HARVESTED: fields.filter(f => f.stage === 'HARVESTED').length,
    };
    return { total, byStatus, byStage };
  }

  async getAgentSummary(agentId: string) {
    const fields = await this.fieldRepository.findAllByAgent(agentId);
    const total = fields.length;
    const byStatus = {
      [FieldStatus.ACTIVE]: fields.filter(f => f.status === FieldStatus.ACTIVE).length,
      [FieldStatus.AT_RISK]: fields.filter(f => f.status === FieldStatus.AT_RISK).length,
      [FieldStatus.COMPLETED]: fields.filter(f => f.status === FieldStatus.COMPLETED).length,
    };
    return { total, byStatus };
  }
}
