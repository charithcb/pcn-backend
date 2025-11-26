import { Router } from "express";
import { InquiryController } from "../controllers/inquiry.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();
const controller = new InquiryController();

router.get("/", authMiddleware, requireRole("admin", "staff"), controller.list.bind(controller));
router.post("/", authMiddleware, controller.create.bind(controller));
router.put("/:id", authMiddleware, requireRole("admin", "staff"), controller.update.bind(controller));

export const inquiryRoutes = router;
