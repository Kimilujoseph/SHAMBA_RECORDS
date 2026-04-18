import { Router } from 'express';
import { FieldController } from '../controllers/field.controller';
import { validate } from '../middleware/validation.middleware';
import { createFieldSchema, updateFieldSchema } from '../validators/field.validator';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { Role } from '../../domain/enums/Role';
import { FieldRepository } from '../../infrastructure/repositories/FieldRepository';
import { FieldService } from '../../application/services/FieldService';

const router = Router();
const fieldRepo = new FieldRepository();
const fieldService = new FieldService(fieldRepo);
const controller = new FieldController(fieldService);

router.use(authMiddleware);

router.post('/', requireRole(Role.ADMIN), validate(createFieldSchema), controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.put('/:id', validate(updateFieldSchema), controller.update);
router.delete('/:id', requireRole(Role.ADMIN), controller.delete);

export default router;
