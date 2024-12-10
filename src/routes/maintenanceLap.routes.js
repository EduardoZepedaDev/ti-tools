import { Router } from "express";
import {
  getMaintenancesLaptop,
  createMaintenanceLaptop,
  deleteMaintenanceLaptop,
} from "../controllers/maintenanceLapController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { maintenanceLapSchema } from "../schemas/maintenanceLapSchema.js";
import { upload } from "../middlewares/multerMaintenanceLap.js";

const router = Router();

router.get("/maintenancesLaptop", authRequired, getMaintenancesLaptop);
router.post(
  "/maintenanceLaptop",
  authRequired,
  upload.fields([
    { name: "front", maxCount: 1 },
    { name: "rightLateral", maxCount: 1 },
    { name: "leftLateral", maxCount: 1 },
    { name: "back", maxCount: 1 },
    { name: "charger", maxCount: 1 },
  ]),
  validateSchema(maintenanceLapSchema),
  createMaintenanceLaptop
);
router.delete("/maintenanceLaptop/:id", authRequired, deleteMaintenanceLaptop);

export default router;
