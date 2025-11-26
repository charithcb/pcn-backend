import { Types } from "mongoose";
import { OrderEntity } from "../order.entity";
import { IOrderRepository } from "../interfaces/order.repository.interface";
import { UseCaseError } from "./errors";

export interface CreateOrderInput {
  customer?: Types.ObjectId;
  vehicle?: Types.ObjectId;
  price?: number;
  status?: OrderEntity["status"];
}

export class OrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async list(): Promise<OrderEntity[]> {
    return this.orderRepository.list();
  }

  async create(payload: CreateOrderInput): Promise<OrderEntity> {
    const { customer, vehicle, price } = payload;

    if (!customer || !vehicle || price === undefined) {
      throw new UseCaseError(400, "customer, vehicle and price are required");
    }

    const entry: Partial<OrderEntity> = {
      customer,
      vehicle,
      price,
      status: payload.status,
    };

    return this.orderRepository.create(entry);
  }

  async update(id: string, updates: Partial<OrderEntity>): Promise<OrderEntity | null> {
    const updated = await this.orderRepository.update(id, updates);
    if (!updated) {
      throw new UseCaseError(404, "Order not found");
    }
    return updated;
  }
}
