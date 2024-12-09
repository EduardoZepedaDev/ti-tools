import { z } from "zod";

export const ticketSchema = z.object({
  date: z
    .date()
    .optional()
    .default(() => new Date()), // Por defecto, se usará la fecha actual si no se proporciona
  folio: z.string().optional(), // Se puede establecer automáticamente, por lo que es opcional aquí
});
