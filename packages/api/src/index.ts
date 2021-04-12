import * as express from 'express';
import * as functions from 'firebase-functions';

const app = express();
app.get("/", (req, res) => res.status(200).send("Hey there!"));

app.get("/student", (req, res) => {
  /** Get all student profile data */
  res.status(501); // todo not implemented
});

app.get("/students", (req, res) => {
  /** Get all students */
  // todo only basic data
  res.status(501); // todo not implemented
});

app.post("/student", (req, res) => {
  /** Update student profile data */
  // todo use a partial type
  res.status(501); // todo not implemented
});

app.get("/tutor", (req, res) => {
  /** Get all tutor profile data */
  res.status(501); // todo not implemented
});

app.get("/tutors", (req, res) => {
  /** Get all tutors */
  // todo only basic data
  res.status(501); // todo not implemented
});

app.post("/tutor", (req, res) => {
  /** Update tutor profile data */
  // todo use a partial type
  res.status(501); // todo not implemented
});

app.get("/subject", (req, res) => {
  /** Get subject by id */
  res.status(501); // todo not implemented
});

app.post("/subject", (req, res) => {
  /** Update subject by id */
  // todo use a partial type
  res.status(501); // todo not implemented
});

app.get("/subjects", (req, res) => {
  /** Get all subjects */
  // todo this should be only basic data about subjects
  res.status(501); // todo not implemented
});

app.get("/students-by-subjects", (req, res) => {
  /** Get students interested in subjects */
  res.status(501); // todo not implemented
});

app.get("/tutors-by-subjects", (req, res) => {
  /** Get students interested in subjects */
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
