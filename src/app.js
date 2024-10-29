// src/app.js
import express from "express";
import userRoutes from "./routes/auth.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
// import coursesRoutes from "./routes/courses.routes.js";

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads")); // Para servir archivos estáticos en /uploads
app.use("/api/users", userRoutes); // Rutas de usuario
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
// app.use("/api", coursesRoutes);

export default app;
