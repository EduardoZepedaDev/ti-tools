import { z } from "zod";

export const maintenanceRoomSchema = z.object({
  date: z.date().optional(), // Fecha es opcional porque tiene un valor predeterminado
  ubication: z.string().nonempty("La ubicación es obligatoria"), // ID referenciado debe ser un string no vacío
  findingstec: z
    .string()
    .trim()
    .min(1, "Los hallazgos técnicos son obligatorios"), // Mínimo 1 carácter
  solution: z.string().trim().min(1, "La solución es obligatoria"), // Mínimo 1 carácter
  screenmain: z.string().optional().default(""), // Campo opcional con valor predeterminado
  secondscreen: z.string().optional().default(""), // Campo opcional con valor predeterminado
  polycom: z.string().optional().default(""), // Campo opcional con valor predeterminado
  hdmi: z.string().optional().default(""), // Campo opcional con valor predeterminado
  signal: z.string().optional().default(""), // Campo opcional con valor predeterminado
  triopolycom: z.string().optional().default(""), // Campo opcional con valor predeterminado
  hdmiTable: z.string().optional().default(""), // Campo opcional con valor predeterminado
});
