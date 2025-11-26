import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const controller = new NotificationController();

router.get("/", authMiddleware, controller.myNotifications.bind(controller));
router.post("/:id/read", authMiddleware, controller.markRead.bind(controller));

export const notificationRoutes = router;
