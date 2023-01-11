import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

class TokenService {
  static generateToken({ id, email, role }) {
    const payload = { id, email, role };

    return {
      accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
      }),
      refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "24h",
      }),
    };
  }

  static verifyAccessToken(accessToken) {
    const accessTokenCheck = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    return accessTokenCheck;
  }

  static verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  }

  // static referesh(refreshToken) {}
}

export default TokenService;
