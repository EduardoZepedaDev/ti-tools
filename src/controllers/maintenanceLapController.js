import Laptop from "../models/maintenanceLapModel.js";

// Obtener todos los mantenimientos
export const getMaintenancesLaptop = async (req, res) => {
  try {
    const laptops = await Laptop.find(); // Llena el campo "user" con los datos del usuario

    res.status(200).json(laptops); // Envía las solicitudes en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los mantenimientos",
      error,
    });
  }
};

// Crear mantenimientos
export const createMaintenanceLaptop = async (req, res) => {
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

    const newMaintenanceLaptop = new Laptop({
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

    await newMaintenanceLaptop.save();
    res.status(201).json(newMaintenanceLaptop);
  } catch (error) {
    console.error("Error al crear la solicitud de mantenimiento:", error);
    res.status(500).json({
      message: "Error al crear la solicitud de mantenimiento",
      error: error.message || "Error desconocido",
    });
  }
};

//Eliminar mantenimiento
export const deleteMaintenanceLaptop = async (req, res) => {
  try {
    const deletedMaintenanceLaptop = await Printer.findByIdAndDelete(
      req.params.id
    );

    if (!deletedMaintenanceLaptop) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }

    res.status(200).json({ message: "Mantenimiento eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el mantenimiento", error });
  }
};
