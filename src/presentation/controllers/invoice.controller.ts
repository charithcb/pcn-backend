import { Request, Response } from "express";
import { InvoiceRepository } from "../../infrastructure/repositories/invoice.repository";

const invoiceRepository = new InvoiceRepository();

export class InvoiceController {
  async list(_req: Request, res: Response) {
    const invoices = await invoiceRepository.list();
    res.json(invoices);
  }

  async create(req: Request, res: Response) {
    const { order, amount, dueDate, issuedTo } = req.body;
    if (!order || !amount || !dueDate || !issuedTo) {
      return res.status(400).json({ message: "order, amount, dueDate and issuedTo are required" });
    }
    const created = await invoiceRepository.create(req.body);
    res.status(201).json(created);
  }

  async update(req: Request, res: Response) {
    const updated = await invoiceRepository.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Invoice not found" });
    res.json(updated);
  }
}
