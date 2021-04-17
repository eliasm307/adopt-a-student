import express, { Request as ExRequest, Response as ExResponse } from 'express';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from '../../tsoa-build/routes';
import swaggerSpec from '../../tsoa-build/swagger-spec.json';

export const app = express();

// Use body parser to read sent json payloads
/*
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
*/

RegisterRoutes(app);

app.use("/", swaggerUi.serve, (_req: ExRequest, res: ExResponse) => {
  // console.log(__filename, { _req, res });
  return res.send(
    swaggerUi.generateHTML(swaggerSpec, {
      explorer: false, // if this is true, a search bar is added but not sure what it does
      customCss: `.try-out__btn, button.btn.authorize.unlocked { display: none !important };`, // hide try it out and auth buttons
      swaggerOptions: {
        tryItOutEnabled: false,
      },
    })
  );
});
