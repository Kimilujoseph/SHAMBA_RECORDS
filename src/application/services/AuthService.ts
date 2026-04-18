import { IUserRepository } from '../interfaces/IUserRepository';
import { PasswordService } from '../../infrastructure/auth/PasswordService';
import { JwtService } from '../../infrastructure/auth/JwtService';
import { RegisterDto, LoginDto, AuthResponseDto } from '../dtos/auth.dto';
import { EmailAlreadyInUseError, InvalidCredentialsError } from '../../shared/errors/custom.errors';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new EmailAlreadyInUseError();
    }

    const hashedPassword = await PasswordService.hash(dto.password);
    const user = await this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    });

    const token = JwtService.generateToken({ id: user.id, email: user.email, role: user.role });
    return {
      user: { id: user.id, email: user.email, role: user.role },
      token,
    };
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const valid = await PasswordService.compare(dto.password, user.password);
    if (!valid) {
      throw new InvalidCredentialsError();
    }

    const token = JwtService.generateToken({ id: user.id, email: user.email, role: user.role });
    return {
      user: { id: user.id, email: user.email, role: user.role },
      token,
    };
  }
}
