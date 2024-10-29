import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

export const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.params.id;
    const profilePictureUrl = req.file.path; // Ruta donde se guarda la imagen

    // Actualiza el perfil del usuario con la URL de la imagen
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: profilePictureUrl },
      { new: true }
    );

    res.status(200).json({ message: "Imagen cargada exitosamente", user });
  } catch (error) {
    res.status(500).json({ message: "Error al cargar la imagen", error });
  }
};

// Registro
export const register = async (req, res) => {
  const { name, lastname, username, email, password, role, profilePicture } =
    req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["Correo ya existe"]);

    const passHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      lastname,
      username,
      email,
      password: passHash,
      role,
      profilePicture,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved.id });

    res.cookie("token", token, {});
    res.json({
      id: userSaved.id,
      name: userSaved.name,
      lastname: userSaved.lastname,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      profilePicture: userSaved.profilePicture,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el registro");
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).send("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = createAccessToken({ id: userFound.id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({
      id: userFound.id,
      name: userFound.name,
      lastname: userFound.lastname,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      profilePicture: userFound.profilePicture,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el login");
  }
};

// Logout
export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.send("Sesión cerrada");
};

// Perfil del usuario
export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    res.json({
      id: userFound.id,
      name: userFound.name,
      lastname: userFound.lastname,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el perfil");
  }
};

// Verificación de Token
export const verifyToken = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, "secretkey123", async (err, user) => {
    if (err) return res.status(401).json({ message: "Token inválido" });

    try {
      const userFound = await User.findById(user.id);
      if (!userFound)
        return res.status(401).json({ message: "Usuario no encontrado" });

      res.json({
        id: userFound.id,
        name: userFound.name,
        lastname: userFound.lastname,
        username: userFound.username,
        email: userFound.email,
        role: userFound.role,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error en la verificación");
    }
  });
};
