import { Router } from "express";
import {
  getMaintenancesPrinter,
  createMaintenancePrinter,
  deleteMaintenancePrinter,
} from "../controllers/maintenancePrinterController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { maintenancePrinterSchema } from "../schemas/maintenancePrinterSchema.js";
import { upload } from "../middlewares/multerMaintenancePrinter.js";

const router = Router();

router.get("/maintenancesPrinter", authRequired, getMaintenancesPrinter);
router.post(
  "/maintenancePrinter",
  authRequired,
  upload.fields([
    { name: "back", maxCount: 1 },
    { name: "front", maxCount: 1 },
  ]),
  validateSchema(maintenancePrinterSchema),
  createMaintenancePrinter
);
router.delete(
  "/maintenancePrinter/:id",
  authRequired,
  deleteMaintenancePrinter
);

export default router;
