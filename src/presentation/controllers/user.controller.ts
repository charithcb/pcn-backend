import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/repositories/user.repository";

const userRepository = new UserRepository();

export class UserController {
  async list(_req: Request, res: Response) {
    const users = await userRepository.list();
    res.json(users.map((u) => ({ ...u.toObject(), password: undefined })));
  }

  async get(req: Request, res: Response) {
    const user = await userRepository.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ ...user.toObject(), password: undefined });
  }

  async update(req: Request, res: Response) {
    const updated = await userRepository.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json({ ...updated.toObject(), password: undefined });
  }
}
