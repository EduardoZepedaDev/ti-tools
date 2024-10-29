import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "No tienes permisos para acceder" });

  jwt.verify(token, "secretkey123", (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalido" });
    req.user = user;
    next();
  });
};
