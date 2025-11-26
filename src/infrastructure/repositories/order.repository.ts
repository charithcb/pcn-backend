import { OrderModel } from "../models/order.model";
import { OrderEntity } from "../../domain/order.entity";

export class OrderRepository {
  async create(entry: Partial<OrderEntity>) {
    const instance = new OrderModel(entry);
    return instance.save();
  }

  async list() {
    return OrderModel.find().sort({ createdAt: -1 }).populate("vehicle").exec();
  }

  async findById(id: string) {
    return OrderModel.findById(id).populate("vehicle").exec();
  }

  async update(id: string, updates: Partial<OrderEntity>) {
    return OrderModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }
}
