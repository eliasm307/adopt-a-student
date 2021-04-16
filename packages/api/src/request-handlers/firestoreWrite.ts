import { FirebaseCallableFunctionHandler } from '../declarations/types';
import { firestore } from '../utils/firebase/firebase-admin';

const handler: FirebaseCallableFunctionHandler = async (data, context) => {
  console.log(__filename, "received request", { data, context });

  try {
    await firestore
      .doc(`tests/writeFunctionTest@${new Date().getTime()}`)
      .set({ timeX: new Date().toLocaleString(), __filename, data });
    console.warn("wrote to firestore successfully");
  } catch (error) {
    console.error("Error writing to firestore from firestore-write");
  }
};

export default handler;
