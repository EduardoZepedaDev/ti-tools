import mongoose from "mongoose";

const maintenanceCCTVSchema = new mongoose.Schema(
  {
    //Nombre del solicitante
    name: {
      type: String,
      required: true,
      trim: true,
    },
    //Categoría del solicitante
    category: {
      type: String,
      required: true,
      trim: true,
    },
    //Técnico que realiza el mantenimiento
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    //Fecha en la que se realiza el equipo
    date: {
      type: Date,
      default: Date.now,
    },
    //Lugar donde se realiza el mantenimiento
    ubication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlaceWork",
    },
    //Detalle de la falla del CCTV
    cctvfailure_detail: {
      type: String,
      required: true,
      trim: true,
    },
    //Hallazgo en la inspección técnica
    technical_inspectionFindings: {
      type: String,
      required: true,
      trim: true,
    },
    //Números de serie de equipos que conforman el CCTV y Estado de cada equipo
    cctvEquipment: {
      type: String,
      required: true,
      trim: true,
    },
    // [
    //   {
    //     serialnumber: {
    //       type: String,
    //       trim: true,
    //       required: true,
    //     },
    //     status: {
    //       type: String,
    //       trim: true,
    //       required: true,
    //     },
    //   },
    // ],
    //Anexo fotográfico del CCTV (Equipo NVR, Antena, Gabinete, Regulador, Cámara individual)
    images: {
      type: [String],
      default: [],
    },
    folio: {
      type: String,
      unique: true, // Garantiza que no haya folios duplicados
    },
  },
  {
    timestamps: true, // Añade automáticamente createdAt y updatedAt
  }
);

maintenanceCCTVSchema.pre("save", async function (next) {
  if (!this.folio) {
    try {
      const ubicationDoc = await mongoose
        .model("PlaceWork")
        .findById(this.ubication);
      if (!ubicationDoc) {
        throw new Error("Ubicación no encontrada");
      }

      const count = await mongoose
        .model("Cctv")
        .countDocuments({ ubication: this.ubication });

      const formattedDate = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

      this.folio = `Mtto-${ubicationDoc.name}-${formattedDate}-${count + 1}`;
    } catch (error) {
      console.error("Error generando el folio:", error);
      return next(error);
    }
  }
  next();
});

maintenanceCCTVSchema.pre(/^find/, function (next) {
  this.populate("user", "id username role"); // Aplica a cualquier consulta de tipo find
  this.populate("ubication", "id name ubication");
  next();
});

export default mongoose.model("Cctv", maintenanceCCTVSchema);
