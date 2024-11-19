import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import {
  getInsumos,
  createInsumos,
  getInsumo,
  updateInsumo,
  deleteInsumo,
} from "../controllers/insumoController.js";
import { insumoSchema } from "../schemas/insumoSchema.js";

const router = Router();

router.get("/insumos", authRequired, getInsumos);
router.get("/insumo/:id", authRequired, getInsumo);
router.post(
  "/insumos",
  authRequired,
  validateSchema(insumoSchema),
  createInsumos
);
router.delete("/insumos/:id", authRequired, deleteInsumo);
router.put("/insumos/:id", authRequired, updateInsumo);

export default router;
