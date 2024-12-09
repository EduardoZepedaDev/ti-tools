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

export default app;
