import { Request, Response } from "express";
import { NotificationService } from "../../services/notification.service";
import { ServiceError } from "../../services/errors";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const notificationService = new NotificationService();

export class NotificationController {
  async myNotifications(req: AuthenticatedRequest, res: Response) {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const notifications = await notificationService.listForUser(req.user._id);
    res.json(notifications);
  }

  async create(req: Request, res: Response) {
    try {
      const created = await notificationService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }

  async markRead(req: Request, res: Response) {
    try {
      const updated = await notificationService.markRead(req.params.id);
      res.json(updated);
    } catch (error) {
      if (error instanceof ServiceError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      throw error;
    }
  }
}
