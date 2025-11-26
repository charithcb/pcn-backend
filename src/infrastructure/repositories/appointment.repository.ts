import { AppointmentModel } from "../models/appointment.model";
import { AppointmentEntity } from "../../domain/appointment.entity";

export class AppointmentRepository {
  async create(entry: Partial<AppointmentEntity>) {
    const instance = new AppointmentModel(entry);
    return instance.save();
  }

  async list() {
    return AppointmentModel.find().sort({ createdAt: -1 }).populate("vehicle").exec();
  }

  async findById(id: string) {
    return AppointmentModel.findById(id).populate("vehicle").exec();
  }

  async update(id: string, updates: Partial<AppointmentEntity>) {
    return AppointmentModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }
}
