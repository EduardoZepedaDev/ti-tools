import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    nameUser: {
      type: String,
      required: true,
      trim: true,
    },
    categoryUser: {
      type: String,
      required: true,
      trim: true,
    },
    ubication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlaceWork", // Referencia al modelo PlaceWork
      required: true,
    },
    reasonrequest: {
      type: String,
      required: true,
    },
    itDiagnostics: {
      type: String,
      required: true,
    },
    dateRequest: {
      type: Date,
      required: true,
      default: Date.now,
    },
    activityDescription: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    comment: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Almacena múltiples URLs o rutas de imágenes
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
maintenanceSchema.pre("save", async function (next) {
  if (!this.folio) {
    try {
      const ubicationDoc = await mongoose
        .model("PlaceWork")
        .findById(this.ubication);
      if (!ubicationDoc) {
        throw new Error("Ubicación no encontrada");
      }

      const count = await mongoose
        .model("Maintenance")
        .countDocuments({ ubication: this.ubication });

      const formattedDate = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

      this.folio = `Mtto-${ubicationDoc.name}-${formattedDate}-${count + 1}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

maintenanceSchema.pre(/^find/, function (next) {
  this.populate("user", "id username role"); // Aplica a cualquier consulta de tipo find
  this.populate("ubication", "id name ubication");
  next();
});

export default mongoose.model("Maintenance", maintenanceSchema);
