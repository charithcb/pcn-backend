import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { hashPassword, verifyPassword } from "../../infrastructure/utils/password";
import { signToken } from "../../infrastructure/utils/jwt";
import { USER_ROLES } from "../../infrastructure/utils/constants";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const userRepository = new UserRepository();

const sanitizeUser = (user: any) => {
  const { password, __v, ...clean } = user.toObject ? user.toObject() : user;
  return clean;
};

export class AuthController {
  async register(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await userRepository.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const resolvedRole = USER_ROLES.includes(role) ? role : "customer";

    const created = await userRepository.create({
      name,
      email,
      password: hashPassword(password),
      role: resolvedRole,
      isActive: true,
    });

    const token = signToken({ sub: created._id?.toString() ?? "", role: created.role, email: created.email });
    return res.status(201).json({ user: sanitizeUser(created), token });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userRepository.findByEmail(email);
    if (!user || !verifyPassword(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "User is inactive" });
    }

    const token = signToken({ sub: user._id.toString(), role: user.role, email: user.email });
    return res.json({ user: sanitizeUser(user), token });
  }

  async me(req: AuthenticatedRequest, res: Response) {
    return res.json({ user: req.user });
  }
}
