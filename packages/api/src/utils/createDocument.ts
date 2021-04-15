import { FirestoreAdmin } from '../declarations/interfaces';
import createPath from './createPath';
import { functionsHttps } from './firebase-admin';

interface Props<D> {
  collectionPath: string;
  data: any;
  dataPredicate: (data: any) => data is D;
  firestore: FirestoreAdmin;
  id: string;
}

export default async function createDocument<D>({
  dataPredicate,
  id,
  collectionPath,
  firestore,
  data,
}: Props<D>) {
  // verify received data
  if (!dataPredicate(data))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not create document because provided data is not valid/complete"
    );

  const path = createPath(collectionPath, id);

  // check if tutor already exists for this user
  const docRef = await firestore.doc(path).get();

  if (docRef.exists)
    // dont throw error if there is an existing tutor, its not that deep
    return {
      success: false,
      data,
      message: "Could not create document because one already exists",
    };

  // create document
  try {
    await firestore.doc(path).set(data);
    return { success: true, data };
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue creating the document",
      JSON.stringify({ __filename })
    );
  }
}
