import express, { Request as ExRequest, Response as ExResponse } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from '../../tsoa-build/swagger-spec.json';

export const app = express();

// const r = redoc.;

// serve your swagger.json file
app.get("/docs/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

// define title and specUrl location
// serve redoc
/*
app.get(
  "/docs",
  redoc({
    title: "API Docs",
    specUrl: "/docs/swagger.json",
    nativeScrollbars: true,
    theme: { colors: { primary: { main: "#dd5522" } } },
  })
);
*/
app.get("/", (_req, res) =>
  res.send(`
<!DOCTYPE html>
<html>
  <head>
    <title>ReDoc</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

    <!--
    ReDoc doesn't change outer page styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <redoc spec-url='/docs/swagger.json'
        expand-responses='all'
        max-displayed-enum-values='5'
        hide-hostname
        hide-schema-patternX
        hide-single-request-sample-tab
        expand-single-schema-field
        json-sample-expand-level='all'
        no-auto-auth
        menu-toggle
        expand-default-server-variables
        hide-schema-titles
        simple-one-of-type-label
        path-in-middle-panel
        required-props-first
        sort-props-alphabetically
        hide-download-button
    ></redoc>
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"> </script>
    <script> document.querySelectorAll('[aria-label="expand properties"]').forEach(button => button.click()); console.log('clicked'); </script>
  </body>
</html>
`)
);

app.use("/docs", swaggerUi.serve, (_req: ExRequest, res: ExResponse) => {
  // console.log(__filename, { _req, res });
  return res.send(
    swaggerUi.generateHTML(swaggerSpec, {
      explorer: false, // if this is true, a search bar is added but not sure what it does
      customCss: `.try-out__btn, button.btn.authorize.unlocked { display: none !important };`, // hide try it out and auth buttons
      swaggerOptions: {
        tryItOutEnabled: false, // dont have try it out activated initially
      },
    })
  );
});
