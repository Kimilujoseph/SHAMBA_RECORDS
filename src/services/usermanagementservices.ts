import { userManagementRepository } from "../databases/repository/usermanagementrepository";
import { APIError, STATUS_CODE } from "../utils/app-error";
import {
  generateSalt,
  generateSignature,
  hashedPassword,
  verifyPassword,
} from "../utils/generatekeys";

interface userDetails {
  name: string;
  email: string;
  password: string;
  role: string;
  driverInfo?: {
    licencePicInfront: string;
    licencePicBackWard: string;
    numberPlate: string;
    vehicleId: Object;
  };
  profilePic?: string;
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
      const userCreated = await this.repository.createUser({
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
}

export { userManagementServices, userDetails };
