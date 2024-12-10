import mongoose from "mongoose";

const maintenanceRoomSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    ubication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlaceWork",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    findingstec: {
      type: String,
      required: true,
      trim: true,
    },
    solution: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: {
          type: String,
          enum: [
            "screenmain",
            "secondscreen",
            "polycom",
            "hdmi",
            "signal",
            "triopolycom",
            "hdmiTable",
          ],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    folio: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

maintenanceRoomSchema.pre("save", async function (next) {
  if (!this.folio) {
    try {
      const ubicationDoc = await mongoose
        .model("PlaceWork")
        .findById(this.ubication);
      if (!ubicationDoc) {
        throw new Error("Ubicación no encontrada");
      }

      // Contar documentos con la misma ubicación
      const count = await mongoose
        .model("MaintenanceRoom")
        .countDocuments({ ubication: this.ubication });

      // Formatear la fecha actual como YYYYMMDD
      const formattedDate = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

      // Generar el folio
      this.folio = `SALADEJUNTAS-${ubicationDoc.name}-${formattedDate}-${
        count + 1
      }`;
    } catch (error) {
      console.error("Error generando el folio:", error);
      return next(error);
    }
  }
  next();
});
// Middleware para poblar la ubicación automáticamente en consultas
maintenanceRoomSchema.pre(/^find/, function (next) {
  this.populate("ubication", "id name"); // Poblar solo el id y el nombre de la ubicación
  this.populate("user", "id username name lastname"); // Poblar solo
  next();
});

export default mongoose.model("MaintenanceRoom", maintenanceRoomSchema);
