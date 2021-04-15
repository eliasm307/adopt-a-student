import { FirebaseCallableFunctionHandler } from '../declarations/types';
import { firestore } from '../utils/firebase-admin';

const firestore = firestore;

const handler: FirebaseCallableFunctionHandler = async (data, context) => {
  console.log(__filename, "received request", { data, context });

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
