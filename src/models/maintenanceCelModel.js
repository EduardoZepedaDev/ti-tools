import mongoose from "mongoose";

const maintenanceCelSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
    serialnumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Active", // Cambiar esto a un arreglo de ObjectId
    },
    ubication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlaceWork",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    detailstec: {
      type: String,
      required: true,
      trim: true,
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
    costtotal: {
      type: String,
      trim: true,
    },
    spareParts: {
      type: String, // Especifica que es un array de cadenas
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["baja", "venta", "entrega"],
      required: true,
    },
    dateReceipt: {
      type: Date,
      default: Date.now,
    },
    dateDelivery: {
      type: Date,
      default: Date.now,
    },
    images: [
      {
        type: {
          type: String,
          enum: ["display", "cover", "side", "charger"],
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
    },
  },
  {
    timestamps: true,
  }
);

maintenanceCelSchema.pre("save", async function (next) {
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
        .model("MaintenanceCel")
        .countDocuments({ ubication: this.ubication });

      let newFolio = `MttoCel-${ubicationDoc.name}-${formattedDate}-${
        count + 1
      }`;

      // Verificar si el folio ya existe
      while (
        await mongoose.model("MaintenanceCel").exists({ folio: newFolio })
      ) {
        count += 1;
        newFolio = `MttoCel-${ubicationDoc.name}-${formattedDate}-${count + 1}`;
      }

      this.folio = newFolio;
    } catch (error) {
      console.error("Error generando el folio:", error);
      return next(error);
    }
  }
  next();
});

maintenanceCelSchema.pre(/^find/, function (next) {
  this.populate("user", "id username role"); // Aplica a cualquier consulta de tipo find
  this.populate("worker", "id name lastname categoryJob");
  this.populate("serialnumber", "id nameofActive serialnumber");
  this.populate("ubication", "id name");
  next();
});

export default mongoose.model("MaintenanceCel", maintenanceCelSchema);
