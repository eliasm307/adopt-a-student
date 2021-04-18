import express, { Request as ExRequest, Response as ExResponse } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from '../../tsoa-build/swagger-spec.json';
import { StudentsController } from '../controllers/StudentController/StudentController';
import { TutorsController } from '../controllers/TutorController/TutorController';

export const app = express();

// const r = redoc.;

// define title and specUrl location
// serve redoc
/*
app.get(
  "/docs",
  redoc({
    title: "API Docs",
    specUrl: "http://petstore.swagger.io/v2/swagger.json",
  })
);
*/

// for groups to work the valuse in the tags field need to match tags in
// the paths array inside each object under the method name e.g. POST ie the tags go inside POST
// the tags are shown under a subheading by the tag name, not as one group under the main taggroup name
const updates = {
  "-x-tagGroups": [
    {
      name: "",
      tags: [StudentsController.id],
    },
    {
      name: "x",
      tags: [TutorsController.typeName],
    },
    {
      name: "Unknown",
      tags: ["na"],
    },
  ],
};

const modifiedSpec = { ...swaggerSpec, ...updates };

/*
modifiedSpec.paths = Object.entries(modifiedSpec.paths).reduce(
  (out, [_path, data]) => {
    const path = _path as keyof typeof modifiedSpec.paths;
    const pathText = _path.replace("/", "");

    const newData = { ...data };
    let tag = "x";
    // Add tags for grouping https://idratherbewriting.com/learnapidoc/pubapis_openapi_step7_tags_object.html

    // const mutators: DataMutatorMap<Record<typeof path, string>> = ({"/createStudent": () => tag=})
    /*
    if (/\/(get | create | update)/i.test(path)) {
      const group = /([A-Z][a-z]+)/.exec(path);

      if (group) {
        {newData.tag = group;
        return {};
      }
    }
  */
// try to see if this matches like this or based on group name
// tag = pathText;
/*
    if (StudentsController.callableNamesMap[pathText]) {
      newData = { ...newData, tags: [] };
    }
*/
/*
    (newData.post as any).tags = [tag];
    return { ...out, [path]: { ...newData } };
  },
  {} as any
);

console.log("Redoc Config", {
  paths: modifiedSpec.paths,
  tags: (modifiedSpec as any)["x-tagGroups"],
  "/createStudent post": modifiedSpec.paths["/createStudent"].post,
  tagsUnknown: modifiedSpec["x-tagGroups"][2],
});
*/
// serve your swagger.json file
app.get("/docs/swagger.json", (req, res) => {
  res.json(modifiedSpec);
});

const redocHtml = `
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
      <div id="redoc-container"></div>
      <redocx spec-url='/docs/swagger.json'
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
    <script>
      Redoc.init(
          '/docs/swagger.json',
          {
            expandDefaultServerVariables: true,
            expandResponses: 'all',
            maxDisplayedEnumValues: 10,
            hideDownloadButton: true,
            hideHostname: true,
            hideSchemaPattern: true,
            hideSingleRequestSampleTab: true,
            expandSingleSchemaField: true,
            jsonSampleExpandLevel: 'all',
            hideSchemaTitles: true,
            simpleOneOfTypeLabel: true,
            menuToggle: true,
            noAutoAuth: true,
            pathInMiddlePanel: true,
            requiredPropsFirst: true,
            sortPropsAlphabetically: true,
            payloadSampleIdx: 3

          },
          document.getElementById('redoc-container'),
          () => document.querySelectorAll('[aria-label="expand properties"]').forEach(button => button.click())
      );

    </script>
  </body>
</html>
`;
app.get("/", (_req, res) => res.send(redocHtml));

app.use("/docs-alt", swaggerUi.serve, (_req: ExRequest, res: ExResponse) => {
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
