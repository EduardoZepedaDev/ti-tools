import { v2 as cloudinary } from "cloudinary";

// Configura las credenciales de Cloudinary
cloudinary.config({
  cloud_name: "dfc5l0p0n", // Nombre de tu cloud
  api_key: "498492534885266", // API Key de tu cuenta
  api_secret: "og7wGOSQEpgIDjejN-D7mMQRe9I", // API Secret de tu cuenta
});

export default cloudinary;
