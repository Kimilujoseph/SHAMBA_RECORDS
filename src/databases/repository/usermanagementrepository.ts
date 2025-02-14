import { user, UserInterface } from "../model/userSchema";
import { APIError, STATUS_CODE } from "../../utils/app-error";
class userManagementRepository {
  /**
   *
   * @param userDetails contains data for creating a new seller
   * @returns the new created seller
   */
  async createUser(
    userDetails: Partial<UserInterface>
  ): Promise<UserInterface> {
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
  async findUser(email: string) {
    return await user.findOne({ email });
  }
}

export { userManagementRepository };
