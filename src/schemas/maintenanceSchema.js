import { z } from "zod";

export const maintenanceSchema = z.object({
  nameUser: z.string({
    required_error: "El nombre de usuario es requerido",
  }),
  categoryUser: z.string({
    required_error: "La categoría del usuario es requerida",
  }),
  ubication: z.string({
    required_error: "La ubicación es requerida",
  }),
  reasonrequest: z.string({
    required_error: "La razón de la solicitud es requerida",
  }),
  itDiagnostics: z.string({
    required_error: "El diagnóstico de TI es requerido",
  }),
  dateRequest: z.date().default(() => new Date()),
  activityDescription: z.string({
    required_error: "La descripción de la actividad es requerida",
  }),
  status: z.boolean().default(true),
  comment: z.string({
    required_error: "El comentario es requerido",
  }),
  images: z.array(z.string().url()).optional(),
});
