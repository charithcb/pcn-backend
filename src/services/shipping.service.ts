import { ShippingRepository } from "../infrastructure/repositories/shipping.repository";
import { ShippingEntity } from "../domain/shipping.entity";
import { SHIPPING_STATUSES } from "../infrastructure/utils/constants";
import { ServiceError } from "./errors";

export class ShippingService {
  constructor(private readonly repository = new ShippingRepository()) {}

  async list() {
    return this.repository.list();
  }

  async create(payload: Partial<ShippingEntity>) {
    if (!payload.order || !payload.address) {
      throw new ServiceError(400, "order and address are required");
    }

    const entry: Partial<ShippingEntity> = {
      order: payload.order,
      address: payload.address,
      city: payload.city,
      country: payload.country,
      trackingNumber: payload.trackingNumber,
      status: SHIPPING_STATUSES.includes(payload.status as any)
        ? (payload.status as ShippingEntity["status"])
        : "pending",
    };

    return this.repository.create(entry);
  }

  async update(id: string, updates: Partial<ShippingEntity>) {
    const updated = await this.repository.update(id, updates);
    if (!updated) throw new ServiceError(404, "Shipment not found");
    return updated;
  }
}
