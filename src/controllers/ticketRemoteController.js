import TicketRemote from "../models/ticketRemoteModel.js";

// Obtener todos los mantenimientos
export const getTicketRemote = async (req, res) => {
  try {
    const tickets = await TicketRemote.find(); // Llena el campo "user" con los datos del usuario

    res.status(200).json(tickets); // Envía las solicitudes en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los tickets remotos",
      error,
    });
  }
};

// Crear mantenimientos
export const createTicketRemote = async (req, res) => {
  const { date, startHour, endHour, reason, anydesk, solution, worker } =
    req.body;

  try {
    // Manejo de imágenes
    const images = req.files.map((file) => file.path);

    // Crear el documento
    const newTicketRemote = new TicketRemote({
      worker,
      date,
      startHour,
      endHour,
      solution,
      reason,
      images,
      anydesk,
      user: req.user.id,
    });

    await newTicketRemote.save(); // Guarda en la base de datos
    res.status(201).json(newTicketRemote); // Devuelve la solicitud recién creada
  } catch (error) {
    res.status(500).json({ message: "Error al crear el ticket", error });
  }
};

// Eliminar mantenimiento
export const deleteTicketRemote = async (req, res) => {
  try {
    const deletedTicketRemote = await Cctv.findByIdAndDelete(req.params.id);

    if (!deletedTicketRemote) {
      return res.status(404).json({ message: "Ticket no encontrado" });
    }

    res.status(200).json({ message: "Ticket eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el Ticket", error });
  }
};
