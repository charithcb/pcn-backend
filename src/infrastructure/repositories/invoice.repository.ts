import { InvoiceModel } from "../models/invoice.model";
import { InvoiceEntity } from "../../domain/invoice.entity";

export class InvoiceRepository {
  async create(entry: Partial<InvoiceEntity>) {
    const instance = new InvoiceModel(entry);
    return instance.save();
  }

  async list() {
    return InvoiceModel.find().sort({ createdAt: -1 }).populate("order").exec();
  }

  async findById(id: string) {
    return InvoiceModel.findById(id).populate("order").exec();
  }

  async update(id: string, updates: Partial<InvoiceEntity>) {
    return InvoiceModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }
}
