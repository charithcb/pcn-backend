import { InquiryRepository } from "../infrastructure/repositories/inquiry.repository";
import { InquiryEntity } from "../domain/inquiry.entity";
import { INQUIRY_STATUSES } from "../infrastructure/utils/constants";
import { ServiceError } from "./errors";

export class InquiryService {
  constructor(private readonly repository = new InquiryRepository()) {}

  async list() {
    return this.repository.list();
  }

  async create(payload: Partial<InquiryEntity>) {
    if (!payload.customer || !payload.message) {
      throw new ServiceError(400, "customer and message are required");
    }

    const entry: Partial<InquiryEntity> = {
      customer: payload.customer,
      vehicle: payload.vehicle,
      message: payload.message,
      status: INQUIRY_STATUSES.includes(payload.status as any)
        ? (payload.status as InquiryEntity["status"])
        : "new",
    };

    return this.repository.create(entry);
  }

  async update(id: string, updates: Partial<InquiryEntity>) {
    const updated = await this.repository.update(id, updates);
    if (!updated) throw new ServiceError(404, "Inquiry not found");
    return updated;
  }
}
