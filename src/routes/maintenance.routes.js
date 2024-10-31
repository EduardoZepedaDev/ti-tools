import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getMaintenances,
  createMaintenance,
  getMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../controllers/maintenanceController.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { maintenanceSchema } from "../schemas/maintenanceSchema.js";

const router = Router();

router.get("/maintenances", authRequired, getMaintenances);
router.get("/maintenance/:id", authRequired, getMaintenance);
router.post(
  "/maintenances",
  authRequired,
  validateSchema(maintenanceSchema),
  createMaintenance
);
router.delete("/maintenances/:id", authRequired, deleteMaintenance);
router.put("/maintenances/:id", authRequired, updateMaintenance);

export default router;
