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
    // Ubicación del trabajador (puede ser un ID de referencia a otra colección)
    ubication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlaceWork", // Referencia a otra colección (si aplica)
      required: true,
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
  }
);

workerSchema.pre(/^find/, function (next) {
  this.populate("ubication", "id name ubication");
  next();
});

export default mongoose.model("Worker", workerSchema);
