import { FirestoreAdmin } from '../declarations/interfaces';
import { functionsHttps } from './firebase-admin';

interface Props<D> {
  dataPredicate: (data: any) => data is D;
  firestore: FirestoreAdmin;
  path: string;
}

export default async function readPrivateUserData<D>({
  dataPredicate,
  path,
  firestore,
}: Props<D>) {
  // check if tutor already exists for this user
  const docSnapshot = await firestore.doc(path).get();

  if (!docSnapshot.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not read data because the user profile doesnt exist, create one first"
    );

  // read data
  try {
    // const newSnapshot = await docSnapshot.ref.get();

    const data = docSnapshot.data();

    if (!dataPredicate(data))
      throw new functionsHttps.HttpsError(
        "internal",
        "User data is not in the right format"
      );

    return data;
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue reading the user data",
      JSON.stringify(error)
    );
  }
}
