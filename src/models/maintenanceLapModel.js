import mongoose from "mongoose";

const maintenanceLapSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["baja", "venta", "entrega"],
      required: true,
    },
    images: [
      {
        type: {
          type: String,
          enum: ["front", "rightLateral", "leftLateral", "back", "charger"],
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

maintenanceLapSchema.pre("save", async function (next) {
  if (!this.folio) {
    try {
      const ubicationDoc = await mongoose
        .model("PlaceWork")
        .findById(this.ubication);
      if (!ubicationDoc) {
        throw new Error("Ubicación no encontrada");
      }

      // Formatear la fecha actual como YYYYMMDD
      const formattedDate = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

      // Generar el folio inicial
      let count = await mongoose
        .model("MaintenanceLap")
        .countDocuments({ ubication: this.ubication });

      let newFolio = `MttoLaptop-${ubicationDoc.name}-${formattedDate}-${
        count + 1
      }`;

      // Verificar si el folio ya existe
      while (
        await mongoose.model("MaintenanceLap").exists({ folio: newFolio })
      ) {
        count += 1;
        newFolio = `MttoLaptop-${ubicationDoc.name}-${formattedDate}-${
          count + 1
        }`;
      }

      this.folio = newFolio;
    } catch (error) {
      console.error("Error generando el folio:", error);
      return next(error);
    }
  }
  next();
});
// Middleware para poblar la ubicación automáticamente en consultas
maintenanceLapSchema.pre(/^find/, function (next) {
  this.populate("ubication", "id name"); // Poblar solo el id y el nombre de la ubicación
  this.populate("user", "id username name lastname"); // Poblar solo
  next();
});

export default mongoose.model("MaintenanceLap", maintenanceLapSchema);
