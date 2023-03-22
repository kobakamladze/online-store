import { validationResult } from "express-validator";
import ApiError from "../error/ApiError.js";
import { User } from "../models/model.js";

import AuthService from "../services/AuthService.js";
import TokenService from "../services/TokenService.js";

class UserController {
  // Registration function
  registration(req, res, next) {
    // Express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;

    return AuthService.registration({ email, password, role })
      .then(token => res.json({ ...token }))
      .catch(e => next(e))
      .finally();
  }

  // Log in function
  logIn(req, res, next) {
    // Express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    return AuthService.logIn({ email, password })
      .then(token => res.json({ ...token }))
      .catch(e => next(e))
      .finally();
  }

  // Log out function
  logOut(req, res) {
    res.json("Logged out");
  }

  // Check authentication function
  check(req, res, next) {
    try {
      const authorizationHeader = req.headers?.authorization;
      if (!authorizationHeader) throw ApiError.unauthorized("Not aurthorized");

      const token = authorizationHeader.split(" ")[1];
      if (!token || token === "undefined" || token === "null")
        throw ApiError.unauthorized("Not aurthorized");

      const decoded = TokenService.verifyAccessToken(token);
      if (!decoded) throw ApiError.forbidden("Not aurthorized");

      res.status(200).json({ authorized: true });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  // Refresh token function
  async refresh(req, res, next) {
    try {
      const authorizationHeader = req.headers?.authorization;
      if (!authorizationHeader)
        throw ApiError.forbidden("Invalid refresh token");

      const token = authorizationHeader.split(" ")[1];
      if (!token || token === "undefined" || token === "null")
        throw ApiError.forbidden("Not aurthorized");

      const decoded = TokenService.verifyRefreshToken(token);
      if (!decoded) throw ApiError.forbidden("Not aurthorized");

      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) throw ApiError.badRequest("User does not exist");

      const { id, email, role } = user;
      const newTokens = TokenService.generateToken({ id, email, role });

      res.status(200).json(newTokens);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new UserController();
