import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';

import routes from './api/routes/v1';
import { logs, port, env } from './config/vars';

class Server {
  constructor() {
    this.server = express();
  }

  async initialize() {
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

    // mount api v1 routes
    this.server.use('/v1', routes);

    // start server
    this.server.listen(port, () =>
      console.log(`server started on port ${port} (${env})`)
    );
  }
}

const server = new Server();
server.initialize();