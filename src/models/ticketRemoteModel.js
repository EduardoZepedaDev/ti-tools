import mongoose from "mongoose";

const ticketRemoteSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    startHour: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Validar formato HH:mm
    },
    endHour: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Validar formato HH:mm
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    anydesk: {
      type: String,
      required: true,
      trim: true,
    },
    solution: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
    folio: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

ticketRemoteSchema.pre("save", async function (next) {
  if (!this.folio) {
    try {
      // Formatear la fecha actual como YYYYMMDD
      const formattedDate = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

      // Contar los documentos existentes con la misma fecha
      let count = await mongoose
        .model("TicketRemote")
        .countDocuments({ folio: { $regex: `^TICKET-${formattedDate}` } });

      // Generar el folio inicial
      let newFolio = `TICKET-${formattedDate}-${count + 1}`;

      // Verificar si el folio ya existe y ajustar el número si es necesario
      while (await mongoose.model("TicketRemote").exists({ folio: newFolio })) {
        count += 1;
        newFolio = `TICKET-${formattedDate}-${count + 1}`;
      }

      this.folio = newFolio;
    } catch (error) {
      console.error("Error generando el folio:", error);
      return next(error);
    }
  }
  next();
});

ticketRemoteSchema.pre(/^find/, function (next) {
  this.populate("user", "id username role");
  this.populate("worker", "id name lastname categoryJob");
  next();
});

export default mongoose.model("TicketRemote", ticketRemoteSchema);
