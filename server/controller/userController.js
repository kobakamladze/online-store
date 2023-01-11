import { validationResult } from "express-validator";
import ApiError from "../error/ApiError.js";

import AuthService from "../services/AuthService.js";

class UserController {
  registration(req, res, next) {
    // Express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;

    return AuthService.registration({ email, password, role })
      .then((token) => {
        console.log(token);

        res.cookie("token", token, {
          maxAge: 24 * 60 * 60 * 60 * 1000,
          httpOnly: true,
        });

        res.json({ ...token });
      })
      .catch((e) => next(e));
  }

  login(req, res, next) {
    // Express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    return AuthService.login({ email, password })
      .then((token) => {
        res.cookie("token", token, { maxAge: 24 * 60 * 60 * 60 * 1000 });
        res.json({ ...token });
      })
      .catch((e) => next(e));
  }

  check(req, res, next) {
    const { id } = req.user;
    if (!id) next(ApiError.badRequest());
    res.json(id);
  }
}

export default new UserController();
