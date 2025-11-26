import { NotificationModel } from "../models/notification.model";
import { NotificationEntity } from "../../domain/notification.entity";

export class NotificationRepository {
  async create(entry: Partial<NotificationEntity>) {
    const instance = new NotificationModel(entry);
    return instance.save();
  }

  async listForUser(userId: string) {
    return NotificationModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async markRead(id: string) {
    return NotificationModel.findByIdAndUpdate(id, { read: true }, { new: true }).exec();
  }
}
