import { userManagementServices } from "../../services/usermanagementservices";
import { APIError } from "../../utils/app-error";
import { Response, Request, NextFunction } from "express";
import { setCookies } from "../../utils/cookieutils";

const usermanagement = new userManagementServices();

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await usermanagement.createNewUser(req.body);
    res.status(200).json({ message: "successfully created the user" });
  } catch (err: any) {
    if (err instanceof APIError) {
      res.status(err.statusCode).json({ message: err.message, error: true });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
const signinUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData = await usermanagement.signinUser(req.body);
    const { token } = userData;
    setCookies(res, "userToken", token);
    res
      .status(200)
      .json({ message: "User signed in successfully", data: userData });
  } catch (err: any) {
    if (err instanceof APIError) {
      res.status(err.statusCode).json({ message: err.message, error: true });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
export { createUser, signinUser };
