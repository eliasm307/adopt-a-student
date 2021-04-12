import * as express from 'express';
import * as functions from 'firebase-functions';

const app = express();
app.get("/", (req, res) => res.status(200).send("Hey there!"));

app.get("/student-profile", (req, res) => {
  res.status(501); // todo not implemented
});

exports.app = functions.https.onRequest(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
