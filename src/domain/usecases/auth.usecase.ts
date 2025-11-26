import { AuthResponse } from "../auth.entity";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { UserEntity } from "../user.entity";
import { USER_ROLES } from "../../infrastructure/utils/constants";
import { hashPassword, verifyPassword } from "../../infrastructure/utils/password";
import { signToken } from "../../infrastructure/utils/jwt";
import { UseCaseError } from "./errors";

export interface RegisterInput {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface LoginInput {
  email?: string;
  password?: string;
}

const sanitizeUser = (user: Partial<UserEntity>) => {
  const source = (user as any)?.toObject ? (user as any).toObject() : user;
  const { password, __v, ...clean } = source as any;
  return clean as Omit<UserEntity, "password">;
};

export class AuthUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(input: RegisterInput): Promise<AuthResponse> {
    const { name, email, password, role } = input;

    if (!name || !email || !password) {
      throw new UseCaseError(400, "Name, email and password are required");
    }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new UseCaseError(409, "User already exists");
    }

    const resolvedRole = USER_ROLES.includes(role as any) ? (role as UserEntity["role"]) : "customer";

    const created = await this.userRepository.create({
      name,
      email,
      password: hashPassword(password),
      role: resolvedRole,
      isActive: true,
    });

    const token = signToken({ sub: created._id?.toString() ?? "", role: created.role, email: created.email });
    return { user: sanitizeUser(created), token };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const { email, password } = input;

    if (!email || !password) {
      throw new UseCaseError(400, "Email and password are required");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user || !verifyPassword(password, user.password)) {
      throw new UseCaseError(401, "Invalid credentials");
    }

    if (!user.isActive) {
      throw new UseCaseError(403, "User is inactive");
    }

    const token = signToken({ sub: user._id?.toString() ?? "", role: user.role, email: user.email });
    return { user: sanitizeUser(user), token };
  }
}
