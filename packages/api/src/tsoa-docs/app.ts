import bodyParser from 'body-parser';
import express, { Request as ExRequest, Response as ExResponse } from 'express';
import swaggerUi from 'swagger-ui-express';

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

app.use("/", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  // console.log(__filename, { _req, res });
  return res.send(
    swaggerUi.generateHTML(await import("../../tsoa-build/swagger-spec.json"))
  );
});
