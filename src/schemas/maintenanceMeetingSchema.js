import { z } from "zod";

export const maintenanceMeetingSchema = z.object({
  // INFORMACIÓN PRINCIPAL
  dateRequest: z.date().default(new Date()), // La fecha actual por defecto
  ubication_nameMeetingRoom: z.string().refine(
    (value) => /^[a-f\d]{24}$/i.test(value), // Validación para ObjectId
    { message: "Ubicación debe ser un ObjectId válido." }
  ),

  // INFORMACIÓN DIAGNÓSTICO
  findingsTechnical: z
    .string()
    .min(1, { message: "Debe incluir hallazgos técnicos." }),
  solutionProposed: z
    .string()
    .min(1, { message: "Debe incluir una solución propuesta." }),

  // INFORMACIÓN EVIDENCIA
  screenMain: z
    .string()
    .url()
    .default(
      "https://res.cloudinary.com/dfc5l0p0n/image/upload/v1732551098/ti-tools/maintenanceMeetingRoomImages/if1zndzjhjqisciiuoj6.webp"
    ),
  screenSecondary: z
    .string()
    .url()
    .default(
      "https://res.cloudinary.com/dfc5l0p0n/image/upload/v1732551098/ti-tools/maintenanceMeetingRoomImages/if1zndzjhjqisciiuoj6.webp"
    ),
  polycom: z
    .string()
    .url()
    .default(
      "https://res.cloudinary.com/dfc5l0p0n/image/upload/v1732552593/ti-tools/maintenanceMeetingRoomImages/oeei9b3jtfpxjqjrznwc.png"
    ),
  hdmiTransmitter: z
    .string()
    .url()
    .default(
      "https://res.cloudinary.com/dfc5l0p0n/image/upload/v1732552592/ti-tools/maintenanceMeetingRoomImages/l2n7kbocx6kbwziz4scl.png"
    ),
  concentratorSignal: z
    .string()
    .url()
    .default(
      "https://res.cloudinary.com/dfc5l0p0n/image/upload/v1732552915/ti-tools/maintenanceMeetingRoomImages/anheal0hoixtmtx456ca.png"
    ),
  polycomTrio: z
    .string()
    .url()
    .default(
      "https://res.cloudinary.com/dfc5l0p0n/image/upload/v1732552593/ti-tools/maintenanceMeetingRoomImages/suy74wx6qrhfjnf86fts.png"
    ),
  hdmiTable: z
    .string()
    .url()
    .default(
      "https://res.cloudinary.com/dfc5l0p0n/image/upload/v1732552592/ti-tools/maintenanceMeetingRoomImages/blagb50wlgdz9xzzwd7h.png"
    ),
});
