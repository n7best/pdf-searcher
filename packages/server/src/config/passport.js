import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { jwtSecret } from "./vars";
import User from "../api/models/user.model";

export const jwt = new JwtStrategy(
  {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer")
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }
);
