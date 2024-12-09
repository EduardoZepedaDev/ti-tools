import mongoose from "mongoose";

const activeSchema = new mongoose.Schema(
  {
    // Nombre del activo
    nameofActive: {
      type: String,
      required: true,
      trim: true,
    },
    // Tipo de activo (ejemplo: laptop, impresora, celular)
    typeActive: {
      type: String,
      required: true,
      trim: true,
    },
    // Modelo del activo
    model: {
      type: String,
      required: true,
      trim: true,
    },
    // Referencia al trabajador asignado
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
    // Número de serie del activo
    serialnumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);
activeSchema.pre(/^find/, function (next) {
  this.populate("worker", "id name categoryJob");
  next();
});
export default mongoose.model("Active", activeSchema);
