import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();
const controller = new UserController();

router.get("/", authMiddleware, requireRole("admin"), controller.list.bind(controller));
router.get("/:id", authMiddleware, requireRole("admin", "staff"), controller.get.bind(controller));
router.put("/:id", authMiddleware, requireRole("admin", "staff"), controller.update.bind(controller));

export const userRoutes = router;
