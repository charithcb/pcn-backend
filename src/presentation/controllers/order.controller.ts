import { Request, Response } from "express";
import { OrderRepository } from "../../infrastructure/repositories/order.repository";
import { OrderUseCase } from "../../domain/usecases/order.usecase";
import { UseCaseError } from "../../domain/usecases/errors";

const orderRepository = new OrderRepository();
const orderUseCase = new OrderUseCase(orderRepository);

export class OrderController {
  async list(_req: Request, res: Response) {
    const orders = await orderUseCase.list();
    res.json(orders);
  }

  async create(req: Request, res: Response) {
    try {
      const created = await orderUseCase.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof UseCaseError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await orderUseCase.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      if (error instanceof UseCaseError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }
}
