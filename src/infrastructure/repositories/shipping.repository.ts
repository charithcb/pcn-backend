import { ShippingModel } from "../models/shipping.model";
import { ShippingEntity } from "../../domain/shipping.entity";

export class ShippingRepository {
  async create(entry: Partial<ShippingEntity>) {
    const instance = new ShippingModel(entry);
    return instance.save();
  }

  async list() {
    return ShippingModel.find().sort({ createdAt: -1 }).populate("order").exec();
  }

  async findById(id: string) {
    return ShippingModel.findById(id).populate("order").exec();
  }

  async update(id: string, updates: Partial<ShippingEntity>) {
    return ShippingModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }
}
