import { Request, Response } from "express";
import { ShippingRepository } from "../../infrastructure/repositories/shipping.repository";

const shippingRepository = new ShippingRepository();

export class ShippingController {
  async list(_req: Request, res: Response) {
    const shipments = await shippingRepository.list();
    res.json(shipments);
  }

  async create(req: Request, res: Response) {
    const { order, address } = req.body;
    if (!order || !address) {
      return res.status(400).json({ message: "order and address are required" });
    }
    const created = await shippingRepository.create(req.body);
    res.status(201).json(created);
  }

  async update(req: Request, res: Response) {
    const updated = await shippingRepository.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Shipment not found" });
    res.json(updated);
  }
}
