import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { workerSchema } from "../schemas/workerSchema.js";
import {
  createWorker,
  getWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker,
} from "../controllers/workerController.js";

const router = Router();

router.post(
  "/workers",
  authRequired,
  validateSchema(workerSchema),
  createWorker
);
router.get("/workers", authRequired, getWorkers);
router.get("/workers/:id", authRequired, getWorkerById);
router.put("/workers/:id", authRequired, updateWorker);
router.delete("/workers/:id", authRequired, deleteWorker);

export default router;
