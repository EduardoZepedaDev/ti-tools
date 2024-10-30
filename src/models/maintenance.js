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
      type: String,
      required: true,
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Maintenance", maintenanceSchema);
