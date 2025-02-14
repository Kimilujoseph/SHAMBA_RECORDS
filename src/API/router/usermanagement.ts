import express, { NextFunction, Request, Response, Router } from "express";
import setupSwagger from "../../config/swagger";
import { createUser } from "../controller/usermanagement";

const router = express.Router();
/**
 * @route  POST /signup
 * @desc   user signup of the system
 * @access Private
 */
router.post("/signup", (req: Request, res: Response, next: NextFunction) =>
  createUser(req, res, next)
);

export default router;
