import Room from "../models/maintenanceRoomModel.js";

// Obtener todos los mantenimientos
export const getMaintenancesRoom = async (req, res) => {
  try {
    const rooms = await Room.find(); // Llena el campo "user" con los datos del usuario

    res.status(200).json(rooms); // Envía las solicitudes en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los mantenimientos",
      error,
    });
  }
};

export const createMaintenanceRoom = async (req, res) => {
  const { date, ubication, findingstec, solution } = req.body;

  try {
    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ message: "No se enviaron imágenes" });
    }

    const images = Object.keys(files).map((fieldname) => ({
      type: fieldname,
      url: files[fieldname][0].path,
    }));

    const newMaintenanceRoom = new Room({
      date,
      ubication,
      findingstec,
      solution,
      images,
      user: req.user.id,
    });

    await newMaintenanceRoom.save();
    res.status(201).json(newMaintenanceRoom);
  } catch (error) {
    console.error("Error al crear la solicitud de mantenimiento:", error);
    res.status(500).json({
      message: "Error al crear la solicitud de mantenimiento",
      error: error.message || "Error desconocido",
    });
  }
};

// Eliminar mantenimiento
export const deleteMaintenanceRoom = async (req, res) => {
  try {
    const deletedMaintenanceCctv = await Room.findByIdAndDelete(req.params.id);

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
