import { OrderModel, OrderDocument } from "../models/order.model";
import { OrderEntity } from "../../domain/order.entity";
import { IOrderRepository } from "../../domain/interfaces/order.repository.interface";

export class OrderRepository implements IOrderRepository {
  private toEntity(doc: OrderDocument | null): OrderEntity | null {
    if (!doc) return null;
    const { _id, customer, vehicle, price, status, createdAt, updatedAt } = doc.toObject();
    return { _id, customer, vehicle, price, status, createdAt, updatedAt };
  }

  async create(entry: Partial<OrderEntity>): Promise<OrderEntity> {
    const instance = new OrderModel(entry);
    const saved = await instance.save();
    return this.toEntity(saved) as OrderEntity;
  }

  async list(): Promise<OrderEntity[]> {
    const results = await OrderModel.find().sort({ createdAt: -1 }).populate("vehicle").exec();
    return results.map((doc) => this.toEntity(doc)) as OrderEntity[];
  }

  async findById(id: string): Promise<OrderEntity | null> {
    const doc = await OrderModel.findById(id).populate("vehicle").exec();
    return this.toEntity(doc);
  }

  async update(id: string, updates: Partial<OrderEntity>): Promise<OrderEntity | null> {
    const updated = await OrderModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    return this.toEntity(updated);
  }
}
