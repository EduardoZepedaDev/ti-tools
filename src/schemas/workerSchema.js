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
});
