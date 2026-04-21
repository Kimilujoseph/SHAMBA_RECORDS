import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { requireRole } from "../middleware/role.middleware";
import { Role } from "../../domain/enums/Role";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { UserService } from "../../application/services/UserService";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeProfileView } from "../middleware/authorizeProfileView.middleware";

const router = Router();
router.use(authMiddleware);
// Dependency Injection
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", requireRole(Role.ADMIN), userController.getAllUsers);
router.get("/:id", authorizeProfileView, userController.getUserById);

export default router;
