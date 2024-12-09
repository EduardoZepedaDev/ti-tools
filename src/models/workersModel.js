import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    // Nombre del trabajador
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Apellido del trabajador
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    // Categoría o puesto del trabajo
    categoryJob: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
  }
);

export default mongoose.model("Worker", workerSchema);
