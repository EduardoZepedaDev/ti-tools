import { z } from "zod";

export const placeSchema = z.object({
  name: z.string({
    required_error: "El nombre de la obra es requerida",
  }),
  ubication: z.string({
    required_error: "La ubicacion es requerida",
  }),
});
