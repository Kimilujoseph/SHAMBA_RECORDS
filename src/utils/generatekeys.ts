import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import configToken from "../config/index";
const { APP_SECRET } = configToken;

const generateSalt = async (): Promise<string> => {
  return bcryptjs.genSalt();
};

const hashedPassword = async (
  password: string,
  salt: string
): Promise<string> => {
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

const verifyPassword = async (
  submittedPassword: string,
  userPassword: string
): Promise<boolean> => {
  const verify = await bcryptjs.compare(submittedPassword, userPassword);
  return verify;
};

const generateSignature = async (
  payload: string | object | Buffer
): Promise<string> => {
  const signature = jwt.sign(payload, APP_SECRET as string);
  return signature;
};

export { generateSalt, hashedPassword, verifyPassword, generateSignature };
