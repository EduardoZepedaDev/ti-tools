import { z } from "zod";

const insumoSchema = z.object({
  number: z.number().min(1, "El número debe ser al menos 1"),
  insumo: z.string().min(1, "El insumo es requerido").trim(),
  quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
  unit: z.string().min(1, "La unidad es requerida").trim(),
  description: z.string().min(1, "La descripción es requerida").trim(),
  remarks: z.string().trim(),
});

export const ticketSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").trim(),
  date: z
    .date()
    .optional()
    .default(() => new Date()), // Por defecto, se usará la fecha actual si no se proporciona
  folio: z.string().optional(), // Se puede establecer automáticamente, por lo que es opcional aquí
  technician: z.string().min(1, "El técnico es requerido").trim(),
  insumos: z.array(insumoSchema).nonempty("Se requiere al menos un insumo"), // Debe ser un arreglo de insumos
});
