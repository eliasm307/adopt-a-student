import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.email,
  }),
  // databaseURL: "https://adopt-a-student.firebaseio.com",
  databaseURL: "https://adopt-a-student.europe-west1.firebasedatabase.app",
});

const firestoreLive = admin.firestore();

// const _firestoreEmulator = admin.firestore();

// _firestoreEmulator.useEmulator("localhost", 8080);

export { functions, firestoreLive };
