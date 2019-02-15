import path from "path";
import dotEnv from "dotenv-safe";

dotEnv.load({
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example")
});

module.exports = {
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === "development",
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri:
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI
  },
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev"
};
