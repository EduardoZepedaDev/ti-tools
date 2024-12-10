import { Router } from "express";
import {
  getMaintenancesRoom,
  createMaintenanceRoom,
  deleteMaintenanceRoom,
} from "../controllers/maintenanceRoomController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { maintenanceRoomSchema } from "../schemas/maintenanceRoomSchema.js";
import { upload } from "../middlewares/multerMaintenanceRoom.js";

const router = Router();

router.get("/maintenancesRoom", authRequired, getMaintenancesRoom);
router.post(
  "/maintenanceRoom",
  authRequired,
  upload.fields([
    { name: "screenmain", maxCount: 1 },
    { name: "secondscreen", maxCount: 1 },
    { name: "polycom", maxCount: 1 },
    { name: "hdmi", maxCount: 1 },
    { name: "signal", maxCount: 1 },
    { name: "triopolycom", maxCount: 1 },
    { name: "hdmiTable", maxCount: 1 },
  ]),
  validateSchema(maintenanceRoomSchema),
  createMaintenanceRoom
);
router.delete("/maintenanceRoom/:id", authRequired, deleteMaintenanceRoom);

export default router;
