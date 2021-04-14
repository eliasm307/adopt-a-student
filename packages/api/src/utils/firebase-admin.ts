// setup from https://github.com/firebase/firebase-admin-node/issues/575#issuecomment-524744793

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

// import functionsTest from 'firebase-functions-test';
// import path from 'path';

const databaseURL = "https://adopt-a-student.europe-west1.firebasedatabase.app";

let app;

if (process.env.NODE_ENV === "development") {
  // make admin app use this for firestore requests
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

  app = admin.initializeApp({
    projectId: "test",
    credential: admin.credential.applicationDefault(),
  });
} else {
  app = admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
      projectId: functions.config().project.id,
      clientEmail: functions.config().client.email,
    }),
    // databaseURL: "https://adopt-a-student.firebaseio.com",
    databaseURL,
  });
}

// you can check all these information in firebase console/settings
/*
const projectConfig = {
  projectId: functions.config().project.id,
  databaseURL,
};
*/

// todo choose one
const firestoreAdmin = admin.firestore();
const firestoreApp = app.firestore();

// you should pass projectConfig and path to serviceAccountKey like this
// path.resolve defaults to directory where you're executing test command
// for my case, it's functions directory
/*
const testEnv = functionsTest(
  projectConfig,
  path.resolve("../../private_config/firebase_service_account_cert.json")
);
*/

// const _firestoreEmulator = admin.firestore();

// _firestoreEmulator.useEmulator("localhost", 8080);

export { firestoreAdmin, firestoreApp };
