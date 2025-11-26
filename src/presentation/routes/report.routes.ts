import { Router } from "express";
import { ReportController } from "../controllers/report.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();
const controller = new ReportController();

router.get("/summary", authMiddleware, requireRole("admin", "staff"), controller.summary.bind(controller));

export const reportRoutes = router;
