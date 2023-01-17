import TokenService from "../services/TokenService.js";
import ApiError from "../error/ApiError.js";

function authRoleMiddleware(role) {
  return function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw ApiError.badRequest("Not aurthorized");

    const decoded = TokenService.verifyAccessToken(token);
    if (!decoded) throw ApiError.badRequest("Not aurthorized");

    if (decoded.role !== role) throw ApiError.forbidden("Forbidden");

    req.user = decoded;
    next();
  };
}
export default authRoleMiddleware;
