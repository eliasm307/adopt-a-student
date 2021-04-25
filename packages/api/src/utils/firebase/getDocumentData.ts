import { FirestoreAdmin } from "../../declarations/interfaces";
import createPath from "../createPath";
import { functionsHttps } from "./firebase-admin";

interface Props<D> {
  collectionPath: string;
  dataPredicate: (data: any) => data is D;
  documentId: string;
  firestoreAdmin: FirestoreAdmin;
}

export default async function getDocumentData<D>({
  dataPredicate,
  documentId,
  collectionPath,
  firestoreAdmin,
}: Props<D>) {
  const path = createPath(collectionPath, documentId);

  // check if tutor already exists for this user
  const docSnapshot = await firestoreAdmin.doc(path).get();

  if (!docSnapshot.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not read data because the document doesnt exist on firestoreAdmin, create one first"
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
