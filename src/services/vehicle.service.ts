import { VehicleRepository } from "../infrastructure/repositories/vehicle.repository";
import { VehicleEntity } from "../domain/vehicle.entity";
import { ServiceError } from "./errors";

export class VehicleService {
  constructor(private readonly repository = new VehicleRepository()) {}

  async list() {
    return this.repository.list();
  }

  async create(payload: Partial<VehicleEntity>) {
    const { title, make, model, year, price } = payload;
    if (!title || !make || !model || !year || price === undefined) {
      throw new ServiceError(400, "title, make, model, year and price are required");
    }

    return this.repository.create(payload);
  }

  async getById(id: string) {
    const vehicle = await this.repository.findById(id);
    if (!vehicle) throw new ServiceError(404, "Vehicle not found");
    return vehicle;
  }

  async update(id: string, updates: Partial<VehicleEntity>) {
    const updated = await this.repository.update(id, updates);
    if (!updated) throw new ServiceError(404, "Vehicle not found");
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new ServiceError(404, "Vehicle not found");
    return deleted;
  }
}
