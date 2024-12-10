import { Router } from "express";
import {
  getTicketRemote,
  createTicketRemote,
  deleteTicketRemote,
} from "../controllers/ticketRemoteController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { ticketRemoteSchema } from "../schemas/ticketRemoteSchema.js";
import upload from "../middlewares/multerTicket.js";

const router = Router();

router.get("/ticketsRemote", authRequired, getTicketRemote);
router.post(
  "/ticketRemote",
  authRequired,
  upload.array("images", 5),
  validateSchema(ticketRemoteSchema),
  createTicketRemote
);
router.delete("/ticketRemote/:id", authRequired, deleteTicketRemote);

export default router;
