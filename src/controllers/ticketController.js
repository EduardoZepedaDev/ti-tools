import Ticket from "../models/ticketModel.js";
import Insumo from "../models/insumoModel.js";

// Obtener todas los tickets
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      user: req.user.id,
    })
      .populate("user")
      .populate("worker"); // Llena el campo "user" con los datos del usuario

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
  const { worker, date, insumos } = req.body;

  try {
    const updatedInsumos = [];

    // Verifica y actualiza las cantidades de cada insumo
    for (const item of insumos) {
      const { insumo, quantityUsed } = item;

      // Busca el insumo en la base de datos
      const insumoFound = await Insumo.findById(insumo);
      if (!insumoFound) {
        return res
          .status(404)
          .json({ message: `Insumo con ID ${insumo} no encontrado` });
      }

      // Verifica si hay suficiente cantidad disponible
      if (insumoFound.quantity < quantityUsed) {
        return res.status(400).json({
          message: `Cantidad insuficiente para el insumo: ${insumoFound.insumo}`,
        });
      }

      // Descuenta la cantidad utilizada
      insumoFound.quantity -= quantityUsed;
      await insumoFound.save();

      // Agrega a la lista de insumos actualizados con toda la información del insumo
      updatedInsumos.push({
        insumo: insumoFound,
        quantityUsed,
        description: insumoFound,
      });
    }

    // Crea el ticket con los insumos actualizados
    const newTicket = new Ticket({
      date,
      insumos: updatedInsumos,
      worker,
      user: req.user.id,
    });

    await newTicket.save();

    // Responde con el ticket creado y los insumos actualizados
    res.status(201).json({
      ticket: newTicket,
      updatedInsumos: updatedInsumos.map((item) => ({
        insumo: item.insumo, // Devuelve el objeto completo del insumo
        quantityUsed: item.quantityUsed,
      })),
    });
  } catch (error) {
    console.error(error);
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
  const { worker, date, insumos } = req.body;

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      {
        worker,
        date,
        insumos,
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
    const deletedTicket = await Ticket.findById(id).populate("insumos.insumo");

    if (!deletedTicket) {
      return res.status(404).json({ message: "Vale de salida no encontrada" });
    }

    for (const item of deletedTicket.insumos) {
      const { insumo, quantityUsed } = item;

      if (insumo && !isNaN(insumo.quantity) && !isNaN(quantityUsed)) {
        insumo.quantity += quantityUsed;
        await insumo.save();
      } else {
        console.error("Datos inválidos en insumo:", {
          insumo: insumo?._id,
          quantity: insumo?.quantity,
          quantityUsed,
        });
      }
    }

    await Ticket.findByIdAndDelete(id);

    res.status(200).json({ message: "Vale de salida eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar el Vale de salida",
      error,
    });
  }
};
