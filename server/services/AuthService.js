import { config } from "dotenv";
import bcrypt from "bcrypt";

import ApiError from "../error/ApiError.js";
import { Basket, User } from "../models/model.js";
import TokenService from "./TokenService.js";

config();

const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
};

class AuthService {
  static registration({ email, password, role = ROLES.USER }) {
    return User.findOne({ where: { email } })
      .then((candidate) => {
        if (candidate)
          throw ApiError.badRequest("User with such Email already exists.");

        const hashedPassword = bcrypt.hashSync(password, 10);

        return Promise.all([
          User.create({ email, password: hashedPassword, role }),
          { email, role },
        ]);
      })
      .then(([user, { email, role }]) =>
        Promise.all([
          TokenService.generateToken({ id: user.id, email, role }),
          Basket.create({ userId: user.id }),
        ])
      )
      .then(([token]) => token);
  }

  static logIn({ email, password }) {
    return User.findOne({ where: { email } }).then((user) => {
      if (!user) throw ApiError.badRequest("Incorrect email or password");

      const passwordCheck = bcrypt.compareSync(password, user.password);
      if (!passwordCheck)
        throw ApiError.badRequest("Incorrect email or password");

      return TokenService.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    });
  }

  static logOut() {}
}

export default AuthService;
