import { Request, Response } from "express";
import { ShippingService } from "../../services/shipping.service";
import { ServiceError } from "../../services/errors";

const shippingService = new ShippingService();

export class ShippingController {
  async list(_req: Request, res: Response) {
    const shipments = await shippingService.list();
    res.json(shipments);
  }

  async create(req: Request, res: Response) {
    try {
      const created = await shippingService.create(req.body);
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
      const updated = await shippingService.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }
}
