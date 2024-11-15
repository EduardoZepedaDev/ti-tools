// src/app.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import placeRoutes from "./routes/place.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", maintenanceRoutes);
app.use("/api", placeRoutes);
app.use("/api", ticketRoutes);

export default app;
