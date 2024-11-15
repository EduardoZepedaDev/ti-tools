import Ticket from "../models/ticketModel.js";

// Obtener todas los tickets
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      user: req.user.id,
    })
      .populate("user") // Llena el campo "user" con los datos del usuario
      .populate("ubication"); // Llena el campo "ubication" con los datos de la ubicación

    res.status(200).json(tickets); // Envía las solicitudes en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los tickets",
      error,
    });
  }
};

// Crear tickets
export const createTickets = async (req, res) => {
  const { name, date, insumos, ubication } = req.body;

  try {
    const newTicket = new Ticket({
      name,
      date,
      insumos,
      ubication,
      user: req.user.id,
    });

    await newTicket.save(); // Guarda la solicitud de mantenimiento en la base de datos
    res.status(201).json(newTicket); // Devuelve la solicitud recién creada
  } catch (error) {
    res.status(500).json({ message: "Error al crear el ticket", error });
  }
};

// Obtener un ticket por ID
export const getTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id).populate("user"); // Encuentra la solicitud por ID
    if (!ticket) {
      return res.status(404).json({ message: "Vale de salida no encontrada" });
    }
    res.status(200).json(ticket); // Devuelve la solicitud en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el vale de salida",
      error,
    });
  }
};

// Actualizar un ticket
export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { name, date, insumos, ubication } = req.body;

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      {
        name,
        date,
        insumos,
        ubication,
      },
      { new: true } // Devuelve la solicitud actualizada
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Vale de salida no encontrada" });
    }

    res.status(200).json(updatedTicket); // Devuelve la solicitud actualizada
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el vale de salida",
      error,
    });
  }
};

// Eliminar el ticket
export const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id); // Elimina la solicitud por ID

    if (!deletedTicket) {
      return res.status(404).json({ message: "Vale de salida no encontrada" });
    }

    res.status(200).json({ message: "Vale de salida eliminada con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el Vale de salida",
      error,
    });
  }
};
