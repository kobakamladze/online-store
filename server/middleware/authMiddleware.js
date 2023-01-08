import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not aurthorized" });

  const decoded = jwt.verify(token, process.env.SECRET);
  req.user = decoded;
  next();
}
