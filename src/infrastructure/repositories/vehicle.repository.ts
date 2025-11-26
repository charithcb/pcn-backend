import { VehicleModel } from "../models/vehicle.model";
import { VehicleEntity } from "../../domain/vehicle.entity";

export class VehicleRepository {
  async create(vehicle: Partial<VehicleEntity>) {
    const instance = new VehicleModel(vehicle);
    return instance.save();
  }

  async list() {
    return VehicleModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: string) {
    return VehicleModel.findById(id).exec();
  }

  async update(id: string, updates: Partial<VehicleEntity>) {
    return VehicleModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async delete(id: string) {
    return VehicleModel.findByIdAndDelete(id).exec();
  }
}
