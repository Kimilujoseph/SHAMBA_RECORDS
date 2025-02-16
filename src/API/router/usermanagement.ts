import express, { Request, Response, NextFunction } from "express";
import { createUser, signinUser } from "../controller/usermanagement";

const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     $ref: '#/components/schemas/Signup'
 */
router.post("/signup", (req: Request, res: Response, next: NextFunction) =>
  createUser(req, res, next)
);

/**
 * @swagger
 * /signin:
 *   post:
 *     $ref: '#/components/schemas/Signin'
 */
router.post("/signin", (req: Request, res: Response, next: NextFunction) => {
  signinUser(req, res, next);
});

export default router;
