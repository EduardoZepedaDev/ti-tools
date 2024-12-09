import { z } from "zod";

export const workerSchema = z.object({
  // Nombre del trabajador
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .trim()
    .nonempty("El nombre no puede estar vacío"),

  // Apellido del trabajador
  lastname: z
    .string()
    .min(1, "El apellido es obligatorio")
    .trim()
    .nonempty("El apellido no puede estar vacío"),

  // Categoría o puesto del trabajo
  categoryJob: z
    .string()
    .min(1, "La categoría del trabajo es obligatoria")
    .trim()
    .nonempty("La categoría del trabajo no puede estar vacía"),

  // Ubicación del trabajador (se asume que es un ObjectId)
  ubication: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "La ubicación debe ser un ID válido"),
});
