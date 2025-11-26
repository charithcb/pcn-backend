import { Router } from "express";
import { InvoiceController } from "../controllers/invoice.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();
const controller = new InvoiceController();

router.get("/", authMiddleware, requireRole("admin", "staff"), controller.list.bind(controller));
router.post("/", authMiddleware, requireRole("admin", "staff"), controller.create.bind(controller));
router.put("/:id", authMiddleware, requireRole("admin", "staff"), controller.update.bind(controller));

export const invoiceRoutes = router;
