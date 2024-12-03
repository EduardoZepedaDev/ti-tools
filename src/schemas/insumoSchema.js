import { z } from "zod";

export const insumoSchema = z.object({
  insumo: z
    .string({
      required_error: "El nombre del insumo es obligatorio",
    })
    .trim()
    .min(1, "El nombre del insumo no puede estar vacío"),
  quantity: z
    .number({
      required_error: "La cantidad es obligatoria",
    })
    .int("La cantidad debe ser un número entero")
    .nonnegative("La cantidad no puede ser negativa"),
});
