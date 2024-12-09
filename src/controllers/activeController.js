import Active from "../models/activeModel.js";

// Obtener todos los activos
export const getActives = async (req, res) => {
  try {
    const actives = await Active.find();
    res.status(200).json(actives);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los activos", error });
  }
};

// Crear un nuevo activo
export const createActive = async (req, res) => {
  const { nameofActive, typeActive, model, worker, serialnumber } = req.body;

  try {
    const newActive = new Active({
      nameofActive,
      typeActive,
      model,
      worker,
      serialnumber,
    });

    await newActive.save();
    res.status(201).json(newActive);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el activo", error });
  }
};

// Obtener un activo por su ID
export const getActiveById = async (req, res) => {
  const { id } = req.params;

  try {
    const active = await Active.findById(id);
    if (!active) {
      return res.status(404).json({ message: "Activo no encontrado" });
    }
    res.status(200).json(active);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el activo", error });
  }
};

// Actualizar un activo por su ID
export const updateActive = async (req, res) => {
  const { id } = req.params;
  const { nameofActive, typeActive, model, worker, serialnumber } = req.body;

  try {
    const updatedActive = await Active.findByIdAndUpdate(
      id,
      {
        nameofActive,
        typeActive,
        model,
        worker,
        serialnumber,
      },
      { new: true, runValidators: true }
    );

    if (!updatedActive) {
      return res.status(404).json({ message: "Activo no encontrado" });
    }

    res.status(200).json(updatedActive);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el activo", error });
  }
};

// Eliminar un activo por su ID
export const deleteActive = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedActive = await Active.findByIdAndDelete(id);

    if (!deletedActive) {
      return res.status(404).json({ message: "Activo no encontrado" });
    }

    res.status(200).json({ message: "Activo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el activo", error });
  }
};
