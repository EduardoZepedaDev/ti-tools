import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String, // Guarda la ruta de la imagen de perfil
      default: "", // Puedes definir una imagen predeterminada
    },
  },
  {
    timestamps: true, // Agrega campos de createdAt y updatedAt automáticamente
  }
);

export default mongoose.model("User", userSchema);
