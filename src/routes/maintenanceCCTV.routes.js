import { Router } from "express";
import {
  getMaintenancesCctv,
  createMaintenanceCctv,
  updateMaintenanceCctv,
  deleteMaintenanceCctv,
} from "../controllers/maintenanceCCTVController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { maintenanceCCTVSchema } from "../schemas/maintenanceCCTVSchema.js";
import upload from "../middlewares/multerMaintenanceCCTV.js";

const router = Router();

router.get("/maintenancesCctv", authRequired, getMaintenancesCctv);
router.post(
  "/maintenanceCctv",
  authRequired,
  upload.array("images", 10),
  validateSchema(maintenanceCCTVSchema),
  createMaintenanceCctv
);
router.delete("/maintenanceCctv/:id", authRequired, deleteMaintenanceCctv);
router.put(
  "/maintenanceCctv/:id",
  authRequired,
  upload.array("images", 10), // Manejo de imágenes opcionales
  updateMaintenanceCctv
);

export default router;
