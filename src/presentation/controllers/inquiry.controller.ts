import { Request, Response } from "express";
import { InquiryRepository } from "../../infrastructure/repositories/inquiry.repository";

const inquiryRepository = new InquiryRepository();

export class InquiryController {
  async list(_req: Request, res: Response) {
    const entries = await inquiryRepository.list();
    res.json(entries);
  }

  async create(req: Request, res: Response) {
    if (!req.body.message) {
      return res.status(400).json({ message: "Message is required" });
    }
    const created = await inquiryRepository.create(req.body);
    res.status(201).json(created);
  }

  async update(req: Request, res: Response) {
    const updated = await inquiryRepository.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Inquiry not found" });
    res.json(updated);
  }
}
