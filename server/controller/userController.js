import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import ApiError from "../error/ApiError.js";
import { Basket, User } from "../models/model.js";

function generateToken({ id, email, role }) {
  const payload = { id, email, role };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
}

class UserController {
  registration(req, res, next) {
    // Express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;

    return User.findOne({ where: { email } })
      .then((candidate) => {
        if (candidate)
          throw ApiError.badRequest({
            message: "User with such Email already exists.",
          });

        const hashedPassword = bcrypt.hashSync(password, 10);

        return Promise.all([
          User.create({ email, password: hashedPassword, role }),
          { email, role },
        ]);
      })
      .then(([user, { email, role }]) =>
        Promise.all([
          generateToken({ id: user.id, email, role }),
          Basket.create({ userId: user.id }),
        ])
      )
      .then(([token]) => res.json({ token }))
      .catch((e) => next(e));
  }

  login(req, res, next) {
    // Express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    return User.findOne({ where: { email } })
      .then((candidate) => {
        if (!candidate) throw ApiError.internal("User not found.");

        const authCheck = bcrypt.compareSync(password, candidate.password);

        if (!authCheck) throw ApiError.internal("Invalid Email or password.");

        const token = generateToken({
          id: candidate.id,
          email,
          role: candidate.role,
        });

        res.json({ token });
      })
      .catch((e) => next(e));
  }

  check(req, res, next) {
    const { id, email, role } = req.user;
    const token = generateToken({ id, email, role });
    return res.json({ token });
  }
}

export default new UserController();
