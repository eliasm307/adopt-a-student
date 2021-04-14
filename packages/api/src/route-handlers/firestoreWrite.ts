import { FirebaseCallableFunctionHandler } from '../declarations/types';
import { firestoreApp } from '../utils/firebase-admin';

const firestore = firestoreApp;

const handler: FirebaseCallableFunctionHandler = async (data, context) => {
  console.log(__filename, "received request", { data, context });

  return firestore
    .doc("tests/writeFunctionTest")
    .set({ time: new Date(), __filename, data });
};

export default handler;
