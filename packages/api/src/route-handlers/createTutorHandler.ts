import { API } from '../declarations/interfaces';
import { FirebaseCallableFunctionHandler } from '../declarations/types';
import { firestoreApp } from '../utils/firebase-admin';
import verifyRequest from '../utils/verifyRequest';

const firestore = firestoreApp;

const handler: API.createTutorHandler = async (data, context) => {
  verifyRequest(data, context);

  try {
    await firestore
      .doc("tests/writeFunctionTestX")
      .set({ timeX: new Date().toLocaleString(), __filename, data });
    console.warn("wrote to firestore successfully xxx");
  } catch (error) {
    console.error("Error writing to firestore from firestore-write");
  }
};

export default handler;
