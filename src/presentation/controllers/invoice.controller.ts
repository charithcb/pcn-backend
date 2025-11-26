import { Request, Response } from "express";
import { InvoiceService } from "../../services/invoice.service";
import { ServiceError } from "../../services/errors";

const invoiceService = new InvoiceService();

export class InvoiceController {
  async list(_req: Request, res: Response) {
    const invoices = await invoiceService.list();
    res.json(invoices);
  }

  async create(req: Request, res: Response) {
    try {
      const created = await invoiceService.create(req.body);
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
      const updated = await invoiceService.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }
}
