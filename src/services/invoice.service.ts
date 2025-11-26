import { InvoiceRepository } from "../infrastructure/repositories/invoice.repository";
import { InvoiceEntity } from "../domain/invoice.entity";
import { INVOICE_STATUSES } from "../infrastructure/utils/constants";
import { ServiceError } from "./errors";

export class InvoiceService {
  constructor(private readonly repository = new InvoiceRepository()) {}

  async list() {
    return this.repository.list();
  }

  async create(payload: Partial<InvoiceEntity>) {
    const { order, amount, dueDate, issuedTo } = payload;
    if (!order || amount === undefined || !dueDate || !issuedTo) {
      throw new ServiceError(400, "order, amount, dueDate and issuedTo are required");
    }

    const entry: Partial<InvoiceEntity> = {
      order,
      amount,
      dueDate,
      issuedTo,
      status: INVOICE_STATUSES.includes(payload.status as any)
        ? (payload.status as InvoiceEntity["status"])
        : "issued",
    };

    return this.repository.create(entry);
  }

  async update(id: string, updates: Partial<InvoiceEntity>) {
    const updated = await this.repository.update(id, updates);
    if (!updated) throw new ServiceError(404, "Invoice not found");
    return updated;
  }
}
