import { AppointmentRepository } from "../infrastructure/repositories/appointment.repository";
import { AppointmentEntity } from "../domain/appointment.entity";
import { APPOINTMENT_STATUSES } from "../infrastructure/utils/constants";
import { ServiceError } from "./errors";

export class AppointmentService {
  constructor(private readonly repository = new AppointmentRepository()) {}

  async list() {
    return this.repository.list();
  }

  async create(payload: Partial<AppointmentEntity>) {
    const { customer, scheduledAt } = payload;
    if (!customer || !scheduledAt) {
      throw new ServiceError(400, "customer and scheduledAt are required");
    }

    const entry: Partial<AppointmentEntity> = {
      customer,
      vehicle: payload.vehicle,
      scheduledAt,
      notes: payload.notes,
      status: APPOINTMENT_STATUSES.includes(payload.status as any)
        ? (payload.status as AppointmentEntity["status"])
        : "scheduled",
    };

    return this.repository.create(entry);
  }

  async update(id: string, updates: Partial<AppointmentEntity>) {
    const updated = await this.repository.update(id, updates);
    if (!updated) throw new ServiceError(404, "Appointment not found");
    return updated;
  }
}
