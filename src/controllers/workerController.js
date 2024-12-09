import Worker from "../models/workersModel.js";

// Obtener todos los trabajadores
export const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los trabajadores", error });
  }
};

// Crear un trabajador
export const createWorker = async (req, res) => {
  const { name, lastname, categoryJob, ubication } = req.body;

  try {
    // Crear un nuevo trabajador
    const newWorker = new Worker({
      name,
      lastname,
      categoryJob,
      ubication,
    });
    await newWorker.save();

    res.status(201).json(newWorker); // Devuelve el trabajador recién creado
  } catch (error) {
    res.status(500).json({ message: "Error al crear el trabajador", error });
  }
};

// Obtener un trabajador por ID
export const getWorkerById = async (req, res) => {
  const { id } = req.params;

  try {
    const worker = await Worker.findById(id);

    if (!worker) {
      return res.status(404).json({ message: "Trabajador no encontrado" });
    }

    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el trabajador", error });
  }
};

// Actualizar un trabajador por ID
export const updateWorker = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, categoryJob, ubication } = req.body;

  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      id,
      {
        name,
        lastname,
        categoryJob,
        ubication,
      },
      { new: true, runValidators: true } // Devuelve el documento actualizado y aplica validaciones
    );

    if (!updatedWorker) {
      return res.status(404).json({ message: "Trabajador no encontrado" });
    }

    res.status(200).json(updatedWorker);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el trabajador", error });
  }
};

// Eliminar un trabajador por ID
export const deleteWorker = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorker = await Worker.findByIdAndDelete(id);

    if (!deletedWorker) {
      return res.status(404).json({ message: "Trabajador no encontrado" });
    }

    res.status(200).json({ message: "Trabajador eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el trabajador", error });
  }
};
