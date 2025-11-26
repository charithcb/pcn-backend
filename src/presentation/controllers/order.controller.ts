import { Request, Response } from "express";
import { OrderRepository } from "../../infrastructure/repositories/order.repository";

const orderRepository = new OrderRepository();

export class OrderController {
  async list(_req: Request, res: Response) {
    const orders = await orderRepository.list();
    res.json(orders);
  }

  async create(req: Request, res: Response) {
    const { customer, vehicle, price } = req.body;
    if (!customer || !vehicle || !price) {
      return res.status(400).json({ message: "customer, vehicle and price are required" });
    }
    const created = await orderRepository.create(req.body);
    res.status(201).json(created);
  }

  async update(req: Request, res: Response) {
    const updated = await orderRepository.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Order not found" });
    res.json(updated);
  }
}
