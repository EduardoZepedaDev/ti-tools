import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { activeSchema } from "../schemas/activeSchema.js";
import {
  getActives,
  createActive,
  getActiveById,
  updateActive,
  deleteActive,
} from "../controllers/activeController.js";

const router = Router();

router.post(
  "/actives",
  authRequired,
  validateSchema(activeSchema),
  createActive
);
router.get("/actives", authRequired, getActives);
router.get("/actives/:id", authRequired, getActiveById);
router.put("/actives/:id", authRequired, updateActive);
router.delete("/actives/:id", authRequired, deleteActive);

export default router;
