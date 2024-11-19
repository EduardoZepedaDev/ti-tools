import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    folio: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ubication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlaceWork", // Referencia al modelo PlaceWork
      required: true,
    },
    insumos: [
      {
        insumo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Insumo",
          required: true,
        },
        quantityUsed: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save hook para generar el folio
ticketSchema.pre("save", async function (next) {
  if (!this.folio) {
    // Solo genera el folio si no existe
    try {
      // Formatea la fecha en formato YYYYMMDD
      const formattedDate = new Date(this.date)
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

      // Cuenta los tickets creados en la misma fecha
      const count = await mongoose.model("Ticket").countDocuments({
        date: {
          $gte: new Date(new Date(this.date).setHours(0, 0, 0, 0)), // Inicio del día
          $lt: new Date(new Date(this.date).setHours(23, 59, 59, 999)), // Fin del día
        },
      });

      // Genera el folio con el formato requerido
      this.folio = `VALETI-${formattedDate}-${count + 1}`;
    } catch (error) {
      return next(error); // Enviar el error al próximo middleware si algo falla
    }
  }
  next();
});

ticketSchema.pre(/^find/, function (next) {
  this.populate("user", "id username role"); // Aplica a cualquier consulta de tipo find
  this.populate("ubication", "id name ubication");
  next();
});

export default mongoose.model("Ticket", ticketSchema);
