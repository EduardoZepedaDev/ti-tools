import Cel from "../models/maintenanceCelModel.js";

// Obtener todos los mantenimientos
export const getMaintenancesCel = async (req, res) => {
  try {
    const cels = await Cel.find(); // Llena el campo "user" con los datos del usuario

    res.status(200).json(cels); // Envía las solicitudes en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los mantenimientos",
      error,
    });
  }
};

// Crear mantenimientos
export const createMaintenanceCel = async (req, res) => {
  const {
    worker,
    serialnumber,
    ubication,
    detailstec,
    findingstec,
    solution,
    costtotal,
    spareParts,
    status,
    dateReceipt,
    dateDelivery,
  } = req.body;

  try {
    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ message: "No se enviaron imágenes" });
    }

    const images = Object.keys(files).map((fieldname) => ({
      type: fieldname,
      url: files[fieldname][0].path,
    }));

    const newMaintenanceCel = new Cel({
      worker,
      serialnumber,
      ubication,
      detailstec,
      findingstec,
      solution,
      costtotal,
      spareParts,
      status,
      dateReceipt,
      dateDelivery,
      images,
      user: req.user.id,
    });

    await newMaintenanceCel.save();
    res.status(201).json(newMaintenanceCel);
  } catch (error) {
    console.error("Error al crear la solicitud de mantenimiento:", error);
    res.status(500).json({
      message: "Error al crear la solicitud de mantenimiento",
      error: error.message || "Error desconocido",
    });
  }
};

//Eliminar mantenimiento
export const deleteMaintenanceCel = async (req, res) => {
  try {
    const deletedMaintenanceCel = await Cel.findByIdAndDelete(req.params.id);

    if (!deletedMaintenanceCel) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }

    res.status(200).json({ message: "Mantenimiento eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el mantenimiento", error });
  }
};
