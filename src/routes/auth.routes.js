import { Router } from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
  uploadProfilePicture,
} from "../controllers/userController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";

const router = Router();

//Ruta para cargar la imagen de perfil del usuario
router.post(
  "/uploadProfilePicture/:id",
  upload.single("profilePicture"),
  uploadProfilePicture
);
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);

export default router;
