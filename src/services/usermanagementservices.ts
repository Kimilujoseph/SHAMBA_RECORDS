import {
  userManagementRepository,
  userDetails,
} from "../databases/repository/usermanagementrepository";
import { APIError, STATUS_CODE } from "../utils/app-error";
import { emailVerification } from "../utils/emailVerification";
import {
  generateSalt,
  generateSignature,
  hashedPassword,
  verifyPassword,
} from "../utils/generatekeys";
import crypto from "crypto";

interface AuthorisedUser extends userDetails {
  token: string;
}
class userManagementServices {
  private repository: userManagementRepository;
  constructor() {
    this.repository = new userManagementRepository();
  }

  async createNewUser(userDetails: userDetails): Promise<string> {
    try {
      //check whether  the user exist
      const { email, password, name, role } = userDetails;
      const userFound = await this.repository.findUser(email);
      if (userFound) {
        throw new APIError(
          "service error",
          STATUS_CODE.BAD_REQUEST,
          `email ${email} already exist`
        );
      }
      //now lets generate the password
      const salt: string = await generateSalt();
      const encryptedPassword: string = await hashedPassword(password, salt);
      const verificationToken: string = crypto.randomBytes(32).toString("hex");
      const user: userDetails = await this.repository.createUser({
        name: name,
        email: email,
        password: encryptedPassword,
        role: role,
        verificationCode: verificationToken,
        verificationTokenExpiresAt: new Date(Date.now() + 9 * 60 * 60 * 1000),
        isVerified: false,
      });

      const emailVerified = await emailVerification(
        user.email,
        user.verificationCode,
        user.name
      );
      return emailVerified.message;
    } catch (err: any) {
      if (err instanceof APIError) {
        throw err;
      }
      throw new APIError(
        "service error",
        STATUS_CODE.INTERNAL_ERROR,
        "failed to create the user"
      );
    }
  }

  async verifyUserEmail(token: string): Promise<string> {
    try {
      const verifiedUser = await this.repository.verifyUserEmail(token);
      if (!verifiedUser) {
        throw new APIError(
          "email verification",
          STATUS_CODE.BAD_REQUEST,
          "invalid email or the token already expired"
        );
      }
      verifiedUser.isVerified = true;
      verifiedUser.verificationCode = "";
      verifiedUser.verificationTokenExpiresAt = new Date();

      verifiedUser.save?.(); //dont worry this is a chain operator same as an if statement you can resarch on it

      return "successfully verified your email";
    } catch (err: any) {
      if (err instanceof APIError) {
        throw err;
      }
      throw new APIError(
        "service error",
        STATUS_CODE.INTERNAL_ERROR,
        "internal server error"
      );
    }
  }
  async signinUser(userDetails: userDetails): Promise<AuthorisedUser> {
    try {
      const { name, email, password } = userDetails;
      //check if user exists
      const userExist = await this.repository.findUser(email);
      if (!userExist) {
        throw new APIError(
          "service error",
          STATUS_CODE.BAD_REQUEST,
          `${email} does not exist`
        );
      }

      //lets compare the passowrd
      const passwordMatch: boolean = await verifyPassword(
        password,
        userExist.password
      );
      if (!passwordMatch) {
        throw new APIError(
          "signin service error",
          STATUS_CODE.BAD_REQUEST,
          "invalid password"
        );
      }
      const payload = {
        name: userExist.name,
        role: userExist.role,
        email: email,
      };
      const token = await generateSignature(payload);
      const authorisedUser: AuthorisedUser = {
        ...userExist,
        token,
      };
      return authorisedUser;
    } catch (err) {
      if (err instanceof APIError) {
        throw err;
      }
      throw new APIError(
        "service error",
        STATUS_CODE.INTERNAL_ERROR,
        "failed to create the user"
      );
    }
  }
}

export { userManagementServices, userDetails };
