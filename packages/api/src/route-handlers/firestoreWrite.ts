import admin from 'firebase-admin';
import functions from 'firebase-functions';

import { FirebaseCallableFunctionHandler } from '../declarations/types';

const firestore = admin.firestore();

const handler: FirebaseCallableFunctionHandler = async (data, context) => {
  console.log(__filename, "received request", { data, context });

  return firestore
    .doc("tests/writeFunctionTest")
    .set({ time: new Date(), __filename });
};

export default handler;
