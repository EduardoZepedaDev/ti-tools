import { z } from "zod";

export const ticketRemoteSchema = z.object({
  date: z.string().datetime().optional(), // La fecha puede ser opcional y debe ser un string en formato ISO.
  startHour: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "El formato debe ser HH:mm")
    .nonempty("La hora de inicio es requerida"),
  endHour: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "El formato debe ser HH:mm")
    .nonempty("La hora de fin es requerida"),
  reason: z
    .string()
    .trim()
    .min(1, "El motivo es requerido")
    .max(500, "El motivo no debe exceder 500 caracteres"),
  anydesk: z
    .string()
    .trim()
    .min(1, "El ID de AnyDesk es requerido")
    .max(100, "El ID de AnyDesk no debe exceder 100 caracteres"),
  solution: z
    .string()
    .trim()
    .min(1, "La solución es requerida")
    .max(1000, "La solución no debe exceder 1000 caracteres"),
  worker: z.string().optional(), // ID del trabajador, opcional.
  folio: z.string().optional(), // Folio único opcional.
});
