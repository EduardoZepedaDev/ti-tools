import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../cloudinary.js";

// Configura el almacenamiento de Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_profiles", // Carpeta en Cloudinary donde se almacenarán las imágenes
    allowed_formats: ["jpg", "png", "jpeg"], // Formatos permitidos
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Nombre único para cada archivo
  },
});

// Crea el middleware de Multer
const upload = multer({ storage });

export default upload;
