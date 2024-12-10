import { Router } from "express";
import {
  getMaintenancesCel,
  createMaintenanceCel,
  deleteMaintenanceCel,
} from "../controllers/maintenanceCelController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { maintenanceCelSchema } from "../schemas/maintenanceCelSchema.js";
import { upload } from "../middlewares/multerMaintenanceCel.js";

const router = Router();

router.get("/maintenancesCel", authRequired, getMaintenancesCel);
router.post(
  "/maintenanceCel",
  authRequired,
  upload.fields([
    { name: "display", maxCount: 1 },
    { name: "cover", maxCount: 1 },
    { name: "side", maxCount: 1 },
    { name: "charger", maxCount: 1 },
  ]),
  validateSchema(maintenanceCelSchema),
  createMaintenanceCel
);
router.delete("/maintenanceCel/:id", authRequired, deleteMaintenanceCel);

export default router;
