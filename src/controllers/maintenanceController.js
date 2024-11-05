import Maintenance from "../models/maintenanceModel.js";

// Obtener todas las solicitudes de mantenimiento de un usuario
export const getMaintenances = async (req, res) => {
  try {
    const maintenances = await Maintenance.find({
      user: req.user.id,
    })
      .populate("user") // Llena el campo "user" con los datos del usuario
      .populate("ubication"); // Llena el campo "ubication" con los datos de la ubicación

    res.status(200).json(maintenances); // Envía las solicitudes en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las solicitudes de mantenimiento",
      error,
    });
  }
};

// Crear una nueva solicitud de mantenimiento
export const createMaintenance = async (req, res) => {
  const {
    nameUser,
    categoryUser,
    ubication,
    reasonrequest,
    itDiagnostics,
    dateRequest,
    activityDescription,
    status,
    comment,
    images,
  } = req.body;

  try {
    const newMaintenance = new Maintenance({
      nameUser,
      categoryUser,
      ubication,
      reasonrequest,
      itDiagnostics,
      dateRequest,
      activityDescription,
      status,
      comment,
      images,
      user: req.user.id,
    });

    await newMaintenance.save(); // Guarda la solicitud de mantenimiento en la base de datos
    res.status(201).json(newMaintenance); // Devuelve la solicitud recién creada
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la solicitud de mantenimiento", error });
  }
};

// Obtener una solicitud de mantenimiento por ID
export const getMaintenance = async (req, res) => {
  const { id } = req.params;

  try {
    const maintenance = await Maintenance.findById(id).populate("user"); // Encuentra la solicitud por ID
    if (!maintenance) {
      return res
        .status(404)
        .json({ message: "Solicitud de mantenimiento no encontrada" });
    }
    res.status(200).json(maintenance); // Devuelve la solicitud en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la solicitud de mantenimiento",
      error,
    });
  }
};

// Actualizar una solicitud de mantenimiento
export const updateMaintenance = async (req, res) => {
  const { id } = req.params;
  const {
    nameUser,
    categoryUser,
    ubication,
    reasonrequest,
    itDiagnostics,
    dateRequest,
    activityDescription,
    status,
    comment,
    images,
  } = req.body;

  try {
    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      id,
      {
        nameUser,
        categoryUser,
        ubication,
        reasonrequest,
        itDiagnostics,
        dateRequest,
        activityDescription,
        status,
        comment,
        images,
      },
      { new: true } // Devuelve la solicitud actualizada
    );

    if (!updatedMaintenance) {
      return res
        .status(404)
        .json({ message: "Solicitud de mantenimiento no encontrada" });
    }

    res.status(200).json(updatedMaintenance); // Devuelve la solicitud actualizada
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la solicitud de mantenimiento",
      error,
    });
  }
};

// Eliminar una solicitud de mantenimiento
export const deleteMaintenance = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMaintenance = await Maintenance.findByIdAndDelete(id); // Elimina la solicitud por ID

    if (!deletedMaintenance) {
      return res
        .status(404)
        .json({ message: "Solicitud de mantenimiento no encontrada" });
    }

    res
      .status(200)
      .json({ message: "Solicitud de mantenimiento eliminada con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la solicitud de mantenimiento",
      error,
    });
  }
};
