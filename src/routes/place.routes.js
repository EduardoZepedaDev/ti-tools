import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import {
  getPlaces,
  createPlace,
  getPlace,
} from "../controllers/placeController.js";
import { placeSchema } from "../schemas/placeSchema.js";

const router = Router();

router.get("/places", authRequired, getPlaces);
router.get("/place/:id", authRequired, getPlace);
router.post("/places", authRequired, validateSchema(placeSchema), createPlace);

export default router;
