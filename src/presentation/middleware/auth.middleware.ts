import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../infrastructure/utils/jwt";
import { UserRepository } from "../../infrastructure/repositories/user.repository";

const userRepository = new UserRepository();

export interface AuthenticatedRequest extends Request {
  user?: { _id: string; role: string; email: string; name: string };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const payload = verifyToken(token);
  if (!payload || typeof payload.sub !== "string") {
    return res.status(401).json({ message: "Invalid token" });
  }

  const user = await userRepository.findById(payload.sub);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  req.user = {
    _id: user._id.toString(),
    role: user.role,
    email: user.email,
    name: user.name,
  };
  return next();
};
