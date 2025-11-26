import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { ServiceError } from "../../services/errors";

const userService = new UserService();

export class UserController {
  async list(_req: Request, res: Response) {
    const users = await userService.list();
    res.json(users);
  }

  async get(req: Request, res: Response) {
    try {
      const user = await userService.get(req.params.id);
      res.json(user);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await userService.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }
}
