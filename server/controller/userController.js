import { validationResult } from "express-validator";
import ApiError from "../error/ApiError.js";

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
      .then((token) => {
        res.cookie("token", token, {
          maxAge: 24 * 60 * 60 * 60 * 1000,
          httpOnly: true,
        });

        res.json({ ...token });
      })
      .catch((e) => next(e));
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
      .then((token) => {
        res.cookie("token", token, { maxAge: 24 * 60 * 60 * 60 * 1000 });
        res.json({ ...token });
      })
      .catch((e) => next(e));
  }

  // Log out function
  logOut(req, res, next) {
    res.clearCookie("token");
    res.json("Logged out");
  }

  // Check auth function
  check(req, res, next) {
    const { id, email, role } = req.user;
    if (!id) next(ApiError.badRequest());
    res.json(TokenService.generateToken({ id, email, role }));
  }
}

export default new UserController();
