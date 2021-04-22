import { FirebaseCallableFunctionHandler } from '../declarations/types';
import { firestoreAdmin } from '../utils/firebase/firebase-admin';

const handler: FirebaseCallableFunctionHandler = async (data, context) => {
  console.log(__filename, "received request", { data, context });

  try {
    await firestoreAdmin
      .doc(`tests/writeFunctionTest@${new Date().getTime()}`)
      .set({ timeX: new Date().toLocaleString(), __filename, data });
    console.warn("wrote to firestore successfully");
    return { message: "yah" };
  } catch (error) {
    console.error("Error writing to firestore from firestore-write");
    return { message: "nah" };
  }
};

export default handler;
