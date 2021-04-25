import { FirestoreAdmin } from '../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from './firebase/firebase-admin';

interface Props<D> {
  dataPredicate: (data: any) => data is D;
  firestoreAdmin: FirestoreAdmin;
  path: string;
}

export default async function readPrivateUserData<D>({
  dataPredicate,
  path,
  firestoreAdmin,
}: Props<D>) {
  // todo use generic getDocumentData here

  // check if tutor already exists for this user
  const docSnapshot = await firestoreAdmin.doc(path).get();

  // ? is this required?
  /*
  if (!docSnapshot.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not read data because the user profile doesnt exist, create one first"
    );
    */

  // read data
  try {
    // const newSnapshot = await docSnapshot.ref.get();

    const data = docSnapshot.data();

    if (!dataPredicate(data)) {
      const error = "User data is not in the right format";
      console.error(__filename, {
        data,
        error,
        path,
        documentExists: docSnapshot.exists,
        documentReadTime: docSnapshot.readTime,
      });
      throw Error(error);
    }

    return data;
  } catch (error) {
    const errorMessage = "There was an issue reading the user data";
    console.error(__filename, { errorMessage, error });
    throw Error(JSON.stringify(error));
  }
}
