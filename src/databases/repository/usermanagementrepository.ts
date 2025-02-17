import { user, UserInterface } from "../model/userSchema";
import { APIError, STATUS_CODE } from "../../utils/app-error";

interface userDetails {
  save?(): unknown;
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
  verificationCode: string;
  isVerified: boolean;
  profilePic?: string;
  verificationTokenExpiresAt: Date;
}
class userManagementRepository {
  /**
   *
   * @param userDetails contains data for creating a new seller
   * @returns the new created seller
   */
  async createUser(userDetails: userDetails): Promise<UserInterface> {
    try {
      const userCreated = await user.create(userDetails);
      return userCreated;
    } catch (err: any) {
      if (err.code === 11000) {
        const duplicateField = Object.keys(err.keyValue)[0];
        throw new APIError(
          "Duplicate Key Error",
          STATUS_CODE.BAD_REQUEST,
          `The ${duplicateField} "${err.keyValue[duplicateField]}" is already in use.`
        );
      }
      throw new APIError(
        "database error",
        STATUS_CODE.INTERNAL_ERROR,
        "internal server error"
      );
    }
  }
  /**
   *
   * @param email find a user by email
   * @returns user object containg the user data
   */
  async findUser(email: string): Promise<userDetails | null> {
    try {
      return await user.findOne({ email }).lean();
    } catch (err: any) {
      throw new APIError(
        "database error",
        STATUS_CODE.INTERNAL_ERROR,
        "internal sever error"
      );
    }
  }

  async verifyUserEmail(token: string): Promise<userDetails | null> {
    try {
      return await user.findOne({
        verificationCode: token,
        verificationTokenExpiresAt: { $gt: Date.now() },
      });
    } catch (err: any) {
      throw new APIError(
        "database error",
        STATUS_CODE.INTERNAL_ERROR,
        "internal server error"
      );
    }
  }
}

export { userManagementRepository, userDetails };
