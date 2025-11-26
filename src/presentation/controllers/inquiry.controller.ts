import { Request, Response } from "express";
import { InquiryService } from "../../services/inquiry.service";
import { ServiceError } from "../../services/errors";

const inquiryService = new InquiryService();

export class InquiryController {
  async list(_req: Request, res: Response) {
    const inquiries = await inquiryService.list();
    res.json(inquiries);
  }

  async create(req: Request, res: Response) {
    try {
      const created = await inquiryService.create(req.body);
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
      const updated = await inquiryService.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }
}
