import { Request, Response } from "express";
import { PreorderService } from "../../services/preorder.service";
import { ServiceError } from "../../services/errors";

const preorderService = new PreorderService();

export class PreorderController {
  async list(_req: Request, res: Response) {
    const entries = await preorderService.list();
    res.json(entries);
  }

  async create(req: Request, res: Response) {
    try {
      const created = await preorderService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await preorderService.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }
}
