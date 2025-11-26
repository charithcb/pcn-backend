import { PreorderRepository } from "../infrastructure/repositories/preorder.repository";
import { PreorderEntity } from "../domain/preorder.entity";
import { PREORDER_STATUSES } from "../infrastructure/utils/constants";
import { ServiceError } from "./errors";

export class PreorderService {
  constructor(private readonly repository = new PreorderRepository()) {}

  async list() {
    return this.repository.list();
  }

  async create(payload: Partial<PreorderEntity>) {
    if (!payload.customer) {
      throw new ServiceError(400, "customer is required");
    }

    const entry: Partial<PreorderEntity> = {
      customer: payload.customer,
      desiredMake: payload.desiredMake,
      desiredModel: payload.desiredModel,
      budget: payload.budget,
      notes: payload.notes,
      status: PREORDER_STATUSES.includes(payload.status as any)
        ? (payload.status as PreorderEntity["status"])
        : "new",
    };

    return this.repository.create(entry);
  }

  async update(id: string, updates: Partial<PreorderEntity>) {
    const updated = await this.repository.update(id, updates);
    if (!updated) throw new ServiceError(404, "Preorder not found");
    return updated;
  }
}
