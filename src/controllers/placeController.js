import PlaceWork from "../models/placeModel.js";

export const getPlaces = async (req, res) => {
  try {
    const places = await PlaceWork.find(); // Obtiene todas las ubicaciones
    res.status(200).json(places); // Envía las ubicaciones en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las ubicaciones",
      error,
    });
  }
};

export const createPlace = async (req, res) => {
  const { name, ubication } = req.body;

  try {
    const newPlace = new PlaceWork({ name, ubication });

    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la ubicacion", error });
  }
};

export const getPlace = async (req, res) => {
  try {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
    const place = await PlaceWork.findById(id); // Busca la ubicación por ID

    if (!place) {
      return res.status(404).json({ message: "Ubicación no encontrada" });
    }

    res.status(200).json(place); // Envía la ubicación en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la ubicación",
      error,
    });
  }
};
