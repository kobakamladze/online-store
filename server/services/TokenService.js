import { config } from "dotenv";
import jwt from "jsonwebtoken";

import ApiError from "../error/ApiError.js";

config();

class TokenService {
  static generateToken({ id, email, role }) {
    const payload = { id, email, role };

    return {
      accessToken: jwt.sign(
        payload, // eslint-disable-next-line
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      ),
      refreshToken: jwt.sign(
        payload,
        // eslint-disable-next-line
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "148h",
        }
      ),
    };
  }

  static verifyAccessToken(accessToken) {
    console.log(accessToken);
    const accessTokenCheck = jwt.verify(
      accessToken,
      // eslint-disable-next-line
      process.env.ACCESS_TOKEN_SECRET,
      (err, user) => {
        if (err) throw ApiError.unauthorized(err.message);

        return user;
      }
    );
    return accessTokenCheck;
  }

  static verifyRefreshToken(refreshToken) {
    return jwt.verify(
      refreshToken,
      // eslint-disable-next-line
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) throw ApiError.forbidden(err.message);

        console.log(user);
        return user;
      }
    );
  }
}

export default TokenService;
