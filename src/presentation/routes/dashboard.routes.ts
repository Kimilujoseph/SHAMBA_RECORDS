import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { FieldRepository } from '../../infrastructure/repositories/FieldRepository';
import { DashboardService } from '../../application/services/DashboardService';

const router = Router();
const fieldRepo = new FieldRepository();
const dashboardService = new DashboardService(fieldRepo);
const controller = new DashboardController(dashboardService);

router.use(authMiddleware);
router.get('/summary', controller.getSummary);

export default router;
