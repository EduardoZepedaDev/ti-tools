// src/schemas/authSchemas.js
import { z } from "zod";

// Esquema para el registro
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(50, { message: "El nombre no debe exceder 50 caracteres" }),
  lastname: z
    .string()
    .min(1, { message: "El apellido es obligatorio" })
    .max(50, { message: "El apellido no debe exceder 50 caracteres" }),
  username: z
    .string()
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    })
    .max(30, { message: "El nombre de usuario no debe exceder 30 caracteres" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "El nombre de usuario solo puede contener letras, números y guiones bajos",
    }),
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(50, { message: "La contraseña no debe exceder 100 caracteres" }),
  role: z.string().min(1, { message: "El rol es obligatorio" }),
});

// Esquema para el inicio de sesión
export const loginSchema = z.object({
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(100, { message: "La contraseña no debe exceder 100 caracteres" }),
});
