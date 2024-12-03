import mongoose from "mongoose";

const insumoSchema = new mongoose.Schema(
  {
    insumo: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folio: {
      type: String,
      unique: true, // Garantiza que no haya folios duplicados
    },
  },
  {
    timestamps: true, // Añade automáticamente createdAt y updatedAt
  }
);

// Middleware para generar el campo `folio`
insumoSchema.pre("save", async function (next) {
  if (this.isNew) {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .split("T")[0]
      .replace(/-/g, ""); // Formatea la fecha como AAAAMMDD

    // Obtiene el número de insumo actual
    const lastInsumo = await this.constructor.findOne().sort({ createdAt: -1 });

    const nextNumber = lastInsumo
      ? parseInt(lastInsumo.folio.split("-")[2], 10) + 1
      : 1;

    // Genera el folio
    this.folio = `INVENTARIOTI-${formattedDate}-${String(nextNumber).padStart(
      4,
      "0"
    )}`;
  }
  next();
});

insumoSchema.pre(/^find/, function (next) {
  this.populate("user", "id username role"); // Aplica a cualquier consulta de tipo find
  next();
});

export default mongoose.model("Insumo", insumoSchema);
