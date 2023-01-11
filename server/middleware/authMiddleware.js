import ApiError from "../error/ApiError.js";
import TokenService from "../services/TokenService.js";

export default function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw ApiError.badRequest({ message: "Not aurthorized" });

    const decoded = TokenService.verifyAccessToken(token);
    if (!decoded) throw ApiError.badRequest({ message: "Not aurthorized" });

    req.user = decoded;
    next();
  } catch (e) {
    next(ApiError.badRequest({ message: "Not authorized" }));
  }
}
