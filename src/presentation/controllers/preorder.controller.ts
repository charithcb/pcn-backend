import { Request, Response } from "express";
import { PreorderRepository } from "../../infrastructure/repositories/preorder.repository";

const preorderRepository = new PreorderRepository();

export class PreorderController {
  async list(_req: Request, res: Response) {
    const entries = await preorderRepository.list();
    res.json(entries);
  }

  async create(req: Request, res: Response) {
    const created = await preorderRepository.create(req.body);
    res.status(201).json(created);
  }

  async update(req: Request, res: Response) {
    const updated = await preorderRepository.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Preorder not found" });
    res.json(updated);
  }
}
