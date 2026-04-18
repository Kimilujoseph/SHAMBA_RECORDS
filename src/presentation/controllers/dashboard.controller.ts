import { Request, Response } from 'express';
import { DashboardService } from '../../application/services/DashboardService';

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  getSummary = async (req: Request, res: Response) => {
    const summary = req.user.role === 'ADMIN'
      ? await this.dashboardService.getAdminSummary()
      : await this.dashboardService.getAgentSummary(req.user.id);
    res.json(summary);
  };
}
