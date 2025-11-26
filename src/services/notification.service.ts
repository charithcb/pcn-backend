import { NotificationRepository } from "../infrastructure/repositories/notification.repository";
import { NotificationEntity } from "../domain/notification.entity";
import { NOTIFICATION_TYPES } from "../infrastructure/utils/constants";
import { ServiceError } from "./errors";

export class NotificationService {
  constructor(private readonly repository = new NotificationRepository()) {}

  async listForUser(userId: string) {
    return this.repository.listForUser(userId);
  }

  async create(payload: Partial<NotificationEntity>) {
    if (!payload.user || !payload.message) {
      throw new ServiceError(400, "user and message are required");
    }

    const entry: Partial<NotificationEntity> = {
      user: payload.user,
      message: payload.message,
      read: payload.read ?? false,
      type: NOTIFICATION_TYPES.includes(payload.type as any)
        ? (payload.type as NotificationEntity["type"])
        : "system",
    };

    return this.repository.create(entry);
  }

  async markRead(id: string) {
    const updated = await this.repository.markRead(id);
    if (!updated) throw new ServiceError(404, "Notification not found");
    return updated;
  }
}
