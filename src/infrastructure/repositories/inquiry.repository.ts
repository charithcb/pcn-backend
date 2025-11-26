import { InquiryModel } from "../models/inquiry.model";
import { InquiryEntity } from "../../domain/inquiry.entity";

export class InquiryRepository {
  async create(entry: Partial<InquiryEntity>) {
    const instance = new InquiryModel(entry);
    return instance.save();
  }

  async list() {
    return InquiryModel.find().sort({ createdAt: -1 }).populate("vehicle").exec();
  }

  async findById(id: string) {
    return InquiryModel.findById(id).populate("vehicle").exec();
  }

  async update(id: string, updates: Partial<InquiryEntity>) {
    return InquiryModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }
}
