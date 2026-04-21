import { IUserRepository } from "../../application/interfaces/IUserRepository";
import { usersResponseDto } from "../dtos/auth.dto";
import { UserProfileNotFoundError } from "../../shared/errors/custom.errors";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async getAllUsers(): Promise<usersResponseDto[]> {
    const users = await this.userRepository.findAll();

    const modifiedUsers = users.map((u) => {
      return {
        user: {
          id: u.id,
          email: u.email,
          role: u.role,
          createdAt: u.createdAt,
        },
      };
    });
    return modifiedUsers;
  }
  async getUserById(id: string): Promise<usersResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserProfileNotFoundError();
    }
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }
}
