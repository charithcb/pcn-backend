import { Router } from "express";
import { PreorderController } from "../controllers/preorder.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();
const controller = new PreorderController();

router.get("/", authMiddleware, requireRole("admin", "staff"), controller.list.bind(controller));
router.post("/", authMiddleware, controller.create.bind(controller));
router.put("/:id", authMiddleware, requireRole("admin", "staff"), controller.update.bind(controller));

export const preorderRoutes = router;
