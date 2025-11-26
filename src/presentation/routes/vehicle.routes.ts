import { Router } from "express";
import { VehicleController } from "../controllers/vehicle.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();
const controller = new VehicleController();

router.get("/", controller.list.bind(controller));
router.get("/:id", controller.get.bind(controller));
router.post("/", authMiddleware, requireRole("admin", "staff"), controller.create.bind(controller));
router.put("/:id", authMiddleware, requireRole("admin", "staff"), controller.update.bind(controller));
router.delete("/:id", authMiddleware, requireRole("admin"), controller.remove.bind(controller));

export const vehicleRoutes = router;
