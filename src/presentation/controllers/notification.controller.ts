import { Request, Response } from "express";
import { NotificationRepository } from "../../infrastructure/repositories/notification.repository";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const notificationRepository = new NotificationRepository();

export class NotificationController {
  async myNotifications(req: AuthenticatedRequest, res: Response) {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const notifications = await notificationRepository.listForUser(req.user._id);
    res.json(notifications);
  }

  async markRead(req: Request, res: Response) {
    const updated = await notificationRepository.markRead(req.params.id);
    if (!updated) return res.status(404).json({ message: "Notification not found" });
    res.json(updated);
  }
}
