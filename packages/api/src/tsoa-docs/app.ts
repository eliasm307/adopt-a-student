import bodyParser from 'body-parser';
import express from 'express';

import { RegisterRoutes } from '../../tsoa-build/routes';

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);
