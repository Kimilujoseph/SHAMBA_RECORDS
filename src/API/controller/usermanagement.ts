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
    const user = await usermanagement.createNewUser(req.body);
    console.log(user);
    res.status(200).json({ message: user });
  } catch (err: any) {
    if (err instanceof APIError) {
      res.status(err.statusCode).json({ message: err.message, error: true });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const verifiyingToken: string = req.query.token?.toString() ?? ""; //still this is a chain operator in modern type script same to if else
    const verifiedUser = await usermanagement.verifyUserEmail(verifiyingToken);
    res.status(200).json({ message: verifiedUser });
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

export { createUser, signinUser, verifyUser };
