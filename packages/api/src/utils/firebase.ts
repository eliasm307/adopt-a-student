import 'firebase/functions';

import firebase from 'firebase';
// The Firebase Admin SDK to access Firestore.
import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

firebase.initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FUNCTIONS PROJECT ID ###'
  databaseURL: 'https://### YOUR DATABASE NAME ###.firebaseio.com',
});

// Initialize Cloud Functions through Firebase
var functions = firebase.functions();