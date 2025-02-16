import {
  userManagementRepository,
  userDetails,
} from "../databases/repository/usermanagementrepository";
import { APIError, STATUS_CODE } from "../utils/app-error";
import {
  generateSalt,
  generateSignature,
  hashedPassword,
  verifyPassword,
} from "../utils/generatekeys";

interface AuthorisedUser extends userDetails {
  token: string;
}
class userManagementServices {
  private repository: userManagementRepository;
  constructor() {
    this.repository = new userManagementRepository();
  }

  async createNewUser(userDetails: userDetails): Promise<userDetails> {
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
      const salt = await generateSalt();
      const encryptedPassword = await hashedPassword(password, salt);
      const userCreated: userDetails = await this.repository.createUser({
        name: name,
        email: email,
        password: encryptedPassword,
        role: role,
      });
      return userCreated;
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
