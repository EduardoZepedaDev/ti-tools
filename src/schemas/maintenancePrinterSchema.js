import { z } from "zod";

export const maintenancePrinterSchema = z.object({
  worker: z.string().optional(), // Puede ser un ObjectId opcional
  serialnumber: z.string(), // Array de ObjectId
  ubication: z.string().optional(), // Puede ser un ObjectId opcional
  detailstec: z.string().min(1), // Cadena de texto requerida y no vacía
  findingstec: z.string().min(1), // Cadena de texto requerida y no vacía
  solution: z.string().min(1), // Cadena de texto requerida y no vacía
  costtotal: z.string().optional(), // Número opcional
  spareParts: z.string(), // Array de cadenas, requerido y debe tener al menos un elemento
  status: z.enum(["baja", "venta", "entrega"]), // Enum con valores permitidos
});
