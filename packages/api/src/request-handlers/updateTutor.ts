import { TUTOR_COLLECTION_NAME } from '../constants';
import { ApiUpdateTutorDataHandler } from '../declarations/interfaces';
import tutorDataUpdater from '../utils/data-updaters/tutorDataUpdater';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import updateDocumentData from '../utils/firebase/updateDocumentData';
import isPrivateTutorData from '../utils/type-predicates/isPrivateTutorData';
import verifyRequest from '../utils/verifyRequest';

const updateTutor: ApiUpdateTutorDataHandler = async (body, context) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (
    !body ||
    !body.data ||
    typeof body.data !== "object" ||
    !Object.keys(body.data).length
  )
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update tutor because provided data is not valid"
    );

  const edits = { ...body.data, uid };

  const updatedData = await updateDocumentData({
    collectionPath: TUTOR_COLLECTION_NAME,
    id: uid,
    edits,
    dataPredicate: isPrivateTutorData,
    dataUpdater: tutorDataUpdater,
    firestore: firestoreAdmin,
  });

  return { data: updatedData };

  /*
  const documentPath = createPath(TUTORS_COLLECTION_NAME, auth.uid);

  // check if tutor already exists for this user
  const docSnapshot = await firestore.doc(documentPath).get();

  if (!docSnapshot.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not edit document because it doesnt exist, create one first"
    );

  const updatedData = dataUpdater({
    edits: data,
    existingData: docSnapshot.data() as PrivateTutorData, // todo does this need type predicate?
  });

  // edit tutor
  try {
    await docSnapshot.ref.update(updatedData);
    const newSnapshot = await docSnapshot.ref.get();

    return {
      success: true,
      data: newSnapshot.data() as PrivateTutorData,
    };
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue editting the document",
      JSON.stringify({ error })
    );
  }
  */
};

export default updateTutor;
