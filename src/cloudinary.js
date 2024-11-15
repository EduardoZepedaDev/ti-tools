import { v2 as cloudinary } from "cloudinary";

// Configura las credenciales de Cloudinary
cloudinary.config({
  cloud_name: "detln6b2a", // Nombre de tu cloud
  api_key: "343793472137895", // API Key de tu cuenta
  api_secret: "6ggeB4_8kRCWwFB7FPyGq_vrruA", // API Secret de tu cuenta
});

export default cloudinary;
