import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { AuthUseCase } from "../../domain/usecases/auth.usecase";
import { UseCaseError } from "../../domain/usecases/errors";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const userRepository = new UserRepository();
const authUseCase = new AuthUseCase(userRepository);

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authUseCase.register(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof UseCaseError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authUseCase.login(req.body);
      return res.json(result);
    } catch (error) {
      if (error instanceof UseCaseError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }

  async me(req: AuthenticatedRequest, res: Response) {
    return res.json({ user: req.user });
  }
}
