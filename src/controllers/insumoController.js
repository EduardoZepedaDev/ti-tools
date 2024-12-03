import Insumo from "../models/insumoModel.js";

// Obtener todos insumos
export const getInsumos = async (req, res) => {
  try {
    const insumos = await Insumo.find({
      user: req.user.id,
    }).populate("user"); // Llena el campo "user" con los datos del usuario

    res.status(200).json(insumos); // Envía las solicitudes en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los insumos",
      error,
    });
  }
};

// Crear insumos
export const createInsumos = async (req, res) => {
  const { insumo, quantity, description } = req.body;

  try {
    console.log("Datos recibidos:", {
      insumo,
      quantity,
      description,
      user: req.user,
    });

    // Verifica que los valores esenciales no sean undefined
    if (!insumo || !quantity) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Busca si ya existe un insumo con el mismo nombre y usuario
    const existingInsumo = await Insumo.findOne({ insumo, user: req.user.id });

    if (existingInsumo) {
      // Si existe, suma la cantidad
      existingInsumo.quantity += quantity;
      await existingInsumo.save();

      return res.status(200).json({
        message: "Cantidad añadida al insumo existente",
        insumo: existingInsumo,
      });
    }

    // Si no existe, crea un nuevo insumo
    const newInsumo = new Insumo({
      insumo,
      quantity,
      description,
      user: req.user.id,
    });

    await newInsumo.save();
    res.status(201).json(newInsumo);
  } catch (error) {
    console.error("Error en createInsumos:", error); // Log del error
    res.status(500).json({
      message: "Error al crear el Insumo",
      error: error.message, // Devuelve el mensaje del error
    });
  }
};

// Obtener un insumo por ID
export const getInsumo = async (req, res) => {
  const { id } = req.params;

  try {
    const insumo = await Insumo.findById(id).populate("user"); // Encuentra la solicitud por ID
    if (!insumo) {
      return res.status(404).json({ message: "Insumo no encontrado" });
    }
    res.status(200).json(insumo); // Devuelve la solicitud en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el insumo",
      error,
    });
  }
};

// Actualizar un insumoo
export const updateInsumo = async (req, res) => {
  const { id } = req.params;
  const { insumo, quantity, description } = req.body;

  try {
    const updatedInsumo = await Insumo.findByIdAndUpdate(
      id,
      {
        insumo,
        quantity,
        description,
      },
      { new: true } // Devuelve la solicitud actualizada
    );

    if (!updatedInsumo) {
      return res.status(404).json({ message: "Insumo no encontrado" });
    }

    res.status(200).json(updatedInsumo); // Devuelve la solicitud actualizada
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el insumo",
      error,
    });
  }
};

// Eliminar el insumo
export const deleteInsumo = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteInsumo = await Insumo.findByIdAndDelete(id); // Elimina la solicitud por ID

    if (!deleteInsumo) {
      return res.status(404).json({ message: "Insumo no encontrada" });
    }

    res.status(200).json({ message: "Insumo eliminado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el Insumo",
      error,
    });
  }
};
