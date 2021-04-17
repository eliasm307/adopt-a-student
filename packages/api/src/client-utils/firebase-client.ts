// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Firebase App (the core Firebase SDK) is always required and
// Add the Firebase services that you want to use
import "firebase/functions";
import "firebase/firestore";
import "firebase/auth";

import urlExistSync from "url-exist-sync";

import config from "../../private_config/config";

// destructure required entries
const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} = config;

// check if all required keys are defined
if (
  !(
    FIREBASE_API_KEY &&
    FIREBASE_AUTH_DOMAIN &&
    FIREBASE_DATABASE_URL &&
    FIREBASE_PROJECT_ID &&
    FIREBASE_STORAGE_BUCKET &&
    FIREBASE_MESSAGING_SENDER_ID &&
    FIREBASE_APP_ID
  )
) {
  console.error({
    FIREBASE_API_KEY: typeof FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: typeof FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: typeof FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: typeof FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: typeof FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: typeof FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: typeof FIREBASE_APP_ID,
  });
  throw Error(`Firebase config keys not defined correctly`);
}

// setup firebase config object
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const app = firebase.initializeApp(firebaseConfig);
// const emulatorApp = firebase.initializeApp(firebaseConfig, "emulator");

////////////////////////////////////////////////////////
// Firebase Authentication exports

const auth = firebase.auth();
auth.useEmulator("http://localhost:9099"); // todo use environment variables to conditionally use this
export { auth };

export const { GoogleAuthProvider, EmailAuthProvider } = firebase.auth;

export interface FireBaseUser extends firebase.User {}

////////////////////////////////////////////////////////
// Firestore exports

export const firestoreLive = firebase.firestore();

const firestoreEmulator = firebase.firestore();
firestoreEmulator.useEmulator("localhost", 8080);

export { firestoreEmulator };

export function isFirestoreEmulatorRunning(): boolean {
  return urlExistSync("http://localhost:4000/firestore/");
}

// firebase types
export type FirestoreClient = firebase.firestore.Firestore;
export type FirestoreDocumentChange = firebase.firestore.DocumentChange<firebase.firestore.DocumentData>;
export type FirestoreBatch = firebase.firestore.WriteBatch;
export type FirestoreDocumentSnapshot = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
export type FirestoreQuerySnapshot = FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

////////////////////////////////////////////////////////
// Functions

export const functionsLive = firebase.functions();

// Using functions emulator
// https://firebase.google.com/docs/emulator-suite/connect_functions
const functionsEmulator = firebase.functions();
functionsEmulator.useEmulator("localhost", 5001);

export type FirebaseFunctions = firebase.functions.Functions;

export { functionsEmulator };
