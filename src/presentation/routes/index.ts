import { Router } from "express";
import authRoutes from "./auth.routes";
import fieldRoutes from "./field.routes";
import dashboardRoutes from "./dashboard.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/fields", fieldRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/users", userRoutes);

export default router;
