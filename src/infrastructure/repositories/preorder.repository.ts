import { PreorderModel } from "../models/preorder.model";
import { PreorderEntity } from "../../domain/preorder.entity";

export class PreorderRepository {
  async create(entry: Partial<PreorderEntity>) {
    const instance = new PreorderModel(entry);
    return instance.save();
  }

  async list() {
    return PreorderModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: string) {
    return PreorderModel.findById(id).exec();
  }

  async update(id: string, updates: Partial<PreorderEntity>) {
    return PreorderModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }
}
