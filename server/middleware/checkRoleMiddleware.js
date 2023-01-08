import jwt from "jsonwebtoken";

function authRoleMiddleware(role) {
  return function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Not aurthorized" });

    const decoded = jwt.verify(token, process.env.SECRET);

    if (decoded.role !== role)
      return res.status(403).json({ message: "Forbidden" });

    req.user = decoded;
    next();
  };
}
export default authRoleMiddleware;
