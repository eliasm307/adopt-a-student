import { FirestoreAdmin } from "../../declarations/interfaces";
import createPath from "../createPath";
import { functionsHttps } from "./firebase-admin";

interface Props<D> {
  collectionPath: string;
  dataPredicate: (data: any) => data is D;
  firestoreAdmin: FirestoreAdmin;
  id: string;
}

export default async function getDocumentData<D>({
  dataPredicate,
  id,
  collectionPath,
  firestoreAdmin,
}: Props<D>) {
  const path = createPath(collectionPath, id);

  // check if tutor already exists for this user
  const docSnapshot = await firestoreAdmin.doc(path).get();

  if (!docSnapshot.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not read data because the document doesnt exist on FirestoreAdmin, create one first"
    );

  // read data
  try {
    const data = docSnapshot.data();

    if (!dataPredicate(data))
      throw new functionsHttps.HttpsError(
        "internal",
        "Document data is not in the right format"
      );

    return data;
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue reading the document data",
      JSON.stringify(error)
    );
  }
}
