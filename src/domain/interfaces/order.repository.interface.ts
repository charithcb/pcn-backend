import { Types } from "mongoose";
import { OrderEntity } from "../order.entity";

export interface IOrderRepository {
  list(): Promise<OrderEntity[]>;
  create(order: Partial<OrderEntity>): Promise<OrderEntity>;
  update(id: string | Types.ObjectId, updates: Partial<OrderEntity>): Promise<OrderEntity | null>;
}
