import { FirestoreAdmin } from "../../declarations/interfaces";
import { functionsHttps } from "./firebase-admin";

interface Props<D> {
  collectionPath: string;
  dataPredicate: (data: any) => data is D;
  firestoreAdmin;
}

export default async function getCollectionData<D>({
  dataPredicate,
  collectionPath,
  firestoreAdmin,
}: Props<D>) {
  // check if tutor already exists for this user
  const snapshot = await firestoreAdmin.collection(collectionPath).get();

  if (!snapshot.docs.length)
    throw new functionsHttps.HttpsError(
      "not-found",
      "No data found in collection",
      { __filename }
    );

  // read data
  try {
    const data = snapshot.docs
      .filter((doc) => doc.exists)
      .map((doc) => {
        const data = doc.data();
        if (!dataPredicate(data))
          throw new functionsHttps.HttpsError(
            "internal",
            "A sub-document's data is not in the right format"
          );

        return data;
      });

    return data;
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue reading the collection data",
      JSON.stringify(error)
    );
  }
}
