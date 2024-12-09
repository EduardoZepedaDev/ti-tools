import { z } from "zod";

export const maintenanceCCTVSchema = z.object({
  name: z.string().nonempty("El nombre es obligatorio"),
  category: z.string().nonempty("La categoría es obligatoria"),
  date: z.string().optional(), // Opcional, ya que el modelo tiene un valor por defecto
  cctvfailure_detail: z
    .string()
    .nonempty("El detalle de la falla es obligatorio"),
  technical_inspectionFindings: z
    .string()
    .nonempty("Los hallazgos de inspección técnica son obligatorios"),
  cctvEquipment: z.string().optional(),
  ubication: z.string().nonempty("La ubicación es obligatoria"),
  images: z.array(z.string()).optional(),
});
