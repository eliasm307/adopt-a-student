import { FirestoreAdmin } from "../../declarations/interfaces";
import createPath from "../createPath";
import { functionsHttps } from "./firebase-admin";

export interface CreateDocumentProps<D> {
  collectionPath: string;
  data: D;
  dataPredicate: (data: any) => data is D;
  documentId: string;
  firestoreAdmin: FirestoreAdmin;
}

export default async function createDocument<D>({
  dataPredicate,
  documentId,
  collectionPath,
  firestoreAdmin,
  data,
}: CreateDocumentProps<D>): Promise<D> {
  console.log(__filename, "Creating document", {
    data,
    documentId,
    collectionPath,
  });

  // verify received data
  if (!dataPredicate(data))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not create document because provided data is not valid/complete"
    );

  const path = createPath(collectionPath, documentId);

  // check if tutor already exists for this user
  const docRef = await firestoreAdmin.doc(path).get();

  if (docRef.exists) {
    console.warn(
      __filename,
      "Could not create document because one already exists at path",
      { path }
    );

    throw new functionsHttps.HttpsError(
      "already-exists",
      "Could not create document because one already exists at path",
      JSON.stringify({ __filename })
    );
  }

  // create document
  try {
    await firestoreAdmin.doc(path).set(data);
    // return { success: true, data };
    return data;
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue creating the document",
      JSON.stringify({ __filename })
    );
  }
}
