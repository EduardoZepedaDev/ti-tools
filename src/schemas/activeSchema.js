import { z } from "zod";

export const activeSchema = z.object({
  nameofActive: z.string().min(1, "El nombre del activo es obligatorio"),
  typeActive: z.string().min(1, "El tipo de activo es obligatorio"),
  model: z.string().min(1, "El modelo es obligatorio"),
  worker: z.string().nonempty("La referencia al trabajador es obligatoria"),
  serialnumber: z
    .string()
    .min(1, "El número de serie es obligatorio")
    .regex(
      /^[\w-]+$/,
      "El número de serie solo puede contener caracteres alfanuméricos y guiones"
    ),
});
