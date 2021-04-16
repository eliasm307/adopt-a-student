import { FirestoreAdmin } from '../declarations/interfaces';
import { DataUpdater } from '../declarations/types';
import createPath from './createPath';
import { functionsHttps } from './firebase-admin';

interface Props<D> {
  collectionPath: string;
  data: any;
  dataPredicate: (data: any) => data is D;
  dataUpdater: DataUpdater<D>;
  firestore: FirestoreAdmin;
  id: string;
}

export default async function updateDocumentData<D>({
  collectionPath,
  data,
  dataPredicate,
  firestore,
  id,
  dataUpdater,
}: Props<D>) {
  const documentPath = createPath(collectionPath, id);

  // check if tutor already exists for this user
  const docSnapshot = await firestore.doc(documentPath).get();

  if (!docSnapshot.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not edit document because it doesnt exist, create one first"
    );

  const existingData = docSnapshot.data();

  // verify received data
  if (!dataPredicate(existingData))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update document because existing data is not valid/complete"
    );

  const updatedData = dataUpdater({
    edits: data,
    existingData,
  });

  // aplly updated data to firestore
  try {
    await docSnapshot.ref.update(updatedData);
    const newSnapshot = await docSnapshot.ref.get();

    return {
      success: true,
      data: newSnapshot.data(),
    };
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue editting the document",
      JSON.stringify({ error })
    );
  }
}
