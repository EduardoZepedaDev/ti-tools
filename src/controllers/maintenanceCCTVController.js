import Cctv from "../models/maintenanceCCTVModel.js";

// Obtener todos los mantenimientos
export const getMaintenancesCctv = async (req, res) => {
  try {
    const cctvs = await Cctv.find(); // Llena el campo "user" con los datos del usuario

    res.status(200).json(cctvs); // Envía las solicitudes en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los mantenimientos",
      error,
    });
  }
};

// Crear mantenimientos
export const createMaintenanceCctv = async (req, res) => {
  const {
    worker,
    date,
    cctvfailure_detail,
    technical_inspectionFindings,
    cctvEquipment,
    ubication,
  } = req.body;

  try {
    // Manejo de imágenes
    const images = req.files.map((file) => file.path);

    // Crear el documento
    const newMaintenanceCctv = new Cctv({
      worker,
      date,
      cctvfailure_detail,
      technical_inspectionFindings,
      cctvEquipment,
      images,
      ubication,
      user: req.user.id,
    });

    await newMaintenanceCctv.save(); // Guarda en la base de datos
    res.status(201).json(newMaintenanceCctv); // Devuelve la solicitud recién creada
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la solicitud de mantenimiento", error });
  }
};

// Actualizar un mantenimiento
export const updateMaintenanceCctv = async (req, res) => {
  const {
    name,
    category,
    date,
    cctvfailure_detail,
    technical_inspectionFindings,
    cctvEquipment,
    ubication,
    images,
  } = req.body;

  try {
    // Manejo de imágenes
    const images = req.files ? req.files.map((file) => file.path) : undefined;

    // Actualizar el mantenimiento
    const updatedMaintenanceCctv = await Cctv.findByIdAndUpdate(
      req.params.id, // El ID del documento a actualizar
      {
        name,
        category,
        date,
        cctvfailure_detail,
        technical_inspectionFindings,
        cctvEquipment,
        images: images || undefined, // Si no se envían nuevas imágenes, no actualizar este campo
        ubication,
      },
      { new: true, runValidators: true } // Devuelve el documento actualizado y aplica validaciones
    );

    if (!updatedMaintenanceCctv) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }

    res.status(200).json(updatedMaintenanceCctv); // Devuelve el mantenimiento actualizado
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el mantenimiento", error });
  }
};

// Eliminar mantenimiento
export const deleteMaintenanceCctv = async (req, res) => {
  try {
    const deletedMaintenanceCctv = await Cctv.findByIdAndDelete(req.params.id);

    if (!deletedMaintenanceCctv) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }

    res.status(200).json({ message: "Mantenimiento eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el mantenimiento", error });
  }
};
