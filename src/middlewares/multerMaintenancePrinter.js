import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary.js"; // Asegúrate de que Cloudinary esté configurado

// Configuración de almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "maintenancePrinterImages", // Carpeta específica en Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Formatos permitidos
  },
});

// Middleware de multer para manejar múltiples archivos
export const upload = multer({
  storage, // Límite de tamaño de archivo: 5 MB
});
