import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    // Busca todos los usuarios en la base de datos
    const users = await User.find({}); // Puedes especificar los campos que deseas retornar

    res.status(200).json(users); // Envía los usuarios en formato JSON
  } catch (error) {
    console.error(error); // Muestra el error en la consola para depuración
    res.status(500).json({
      message: "Error al obtener los usuarios",
      error,
    });
  }
};

// Registro
export const register = async (req, res) => {
  const { name, lastname, username, email, password, role, jobTitle } =
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
      jobTitle,
      profilePicture: req.file ? req.file.path : "", // Guarda la URL de Cloudinary
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
      jobTitle: userSaved.jobTitle,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      profilePicture: userSaved.profilePicture,
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

    if (!userFound) {
      return res.status(400).send("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = await createAccessToken({ id: userFound.id });

    res.cookie("token", token, {});
    res.json({
      id: userFound.id,
      name: userFound.name,
      lastname: userFound.lastname,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      profilePicture: userFound.profilePicture,
      jobTitle: userFound.jobTitle,
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

//PROFILE
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });
  return res.json({
    id: userFound.id,
    name: userFound.name,
    lastname: userFound.lastname,
    username: userFound.username,
    email: userFound.email,
    role: userFound.role,
    profilePicture: userFound.profilePicture,
    jobTitle: userFound.jobTitle,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

// Verify token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, "secretkey123", async (err, user) => {
    if (err) return res.status(401).json({ message: "Token inválido" });

    const userFound = await User.findById(user.id);
    if (!userFound)
      return res.status(401).json({ message: "Usuario no encontrado" });

    return res.json({
      id: userFound.id,
      name: userFound.name,
      lastname: userFound.lastname,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      profilePicture: userFound.profilePicture,
      jobTitle: userFound.jobTitle,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  });
};
