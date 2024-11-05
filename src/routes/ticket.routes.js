import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import {
  getTickets,
  createTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";
import { ticketSchema } from "../schemas/ticketSchema.js";

const router = Router();

router.get("/tickets", authRequired, getTickets);
router.get("/ticket/:id", authRequired, getTicket);
router.post(
  "/tickets",
  authRequired,
  validateSchema(ticketSchema),
  createTickets
);
router.delete("/tickets/:id", authRequired, deleteTicket);
router.put("/tickets/:id", authRequired, updateTicket);

export default router;
