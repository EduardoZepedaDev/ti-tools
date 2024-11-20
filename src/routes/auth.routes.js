import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";
import upload from "../middlewares/multerProfile.js";

const router = Router();

router.get("/users", authRequired, getUsers);
router.post(
  "/register",
  upload.single("profilePicture"), // Middleware para manejar la carga de imágenes
  validateSchema(registerSchema), // Valida el cuerpo de la solicitud
  register // Controlador que maneja el registro
);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);
router.delete("/user/:id", authRequired, deleteUser);

export default router;
