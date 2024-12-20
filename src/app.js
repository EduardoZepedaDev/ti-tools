// src/app.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import maintenanceCCTVRoutes from "./routes/maintenanceCCTV.routes.js";
import placeRoutes from "./routes/place.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import insumoRoutes from "./routes/insumo.routes.js";
import workerRoutes from "./routes/worker.routes.js";
import activeRoutes from "./routes/active.routes.js";
import roomRoutes from "./routes/maintenanceRoom.routes.js";
import celRoutes from "./routes/maintenanceCel.routes.js";
import printerRoutes from "./routes/maintenancePrinter.routes.js";
import lapRoutes from "./routes/maintenanceLap.routes.js";
import ticketRemoteRoutes from "./routes/ticketRemote.routes.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/v1", authRoutes);
app.use("/v1", maintenanceCCTVRoutes);
app.use("/v1", placeRoutes);
app.use("/v1", ticketRoutes);
app.use("/v1", insumoRoutes);
app.use("/v1", workerRoutes);
app.use("/v1", activeRoutes);
app.use("/v1", roomRoutes);
app.use("/v1", celRoutes);
app.use("/v1", printerRoutes);
app.use("/v1", lapRoutes);
app.use("/v1", ticketRemoteRoutes);

export default app;
