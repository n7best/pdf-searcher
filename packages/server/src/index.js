import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import helmet from "helmet";
import passport from "passport";
import cors from "cors";

import routes from "./api/routes/v1";
import { handler as errorHandler, notFound } from "./api/middlewares/error";
import { logs, port, env } from "./config/vars";
import { jwt as JwtStrategy } from "./config/passport";
import db from "./config/db";
import seed from "./seed";

class Server {
  constructor() {
    this.server = express();
  }

  async initialize() {
    console.log(`[Environment] ${env}`);
    // init database
    await db.connect();

    // seed database
    await seed();

    // request logging. dev: console | production: file
    this.server.use(morgan(logs));

    // parse body params and attache them to req.body
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));

    // lets you use HTTP verbs such as PUT or DELETE
    // in places where the client doesn't support it
    this.server.use(methodOverride());

    // secure apps by setting various HTTP headers
    this.server.use(helmet());

    // enable CORS - Cross Origin Resource Sharing
    this.server.use(cors());

    // enable authentication
    this.server.use(passport.initialize());
    passport.use("jwt", JwtStrategy);

    // mount api v1 routes
    this.server.use("/v1", routes);

    // catch 404
    this.server.use(notFound);

    // catch api erros
    this.server.use(errorHandler);

    // start server
    this.server.listen(port, () =>
      console.log(`[http] started on port ${port}`)
    );
  }
}

const server = new Server();
server.initialize();
