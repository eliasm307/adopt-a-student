import { PrivateTutorData } from '@adopt-a-student/common';

import { TUTORS_COLLECTION_NAME } from '../constants';
import { ApiUpdateTutorDataHandler } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import { firestore, functionsHttps } from '../utils/firebase-admin';
import tutorDataUpdater from '../utils/tutorDataUpdater';
import isPartialPrivateTutorData from '../utils/type-predicates/isPartialPrivateTutorData';
import verifyRequest from '../utils/verifyRequest';

const updateTutor: ApiUpdateTutorDataHandler = async (data, context) => {
  const auth = verifyRequest(data, context);

  const dataUpdater = tutorDataUpdater;

  // ! this doesnt do anything, you dont need to know the shape of partial data
  // verify received data
  /*
  if (!isPartialPrivateTutorData(data))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update tutor because provided data is not valid"
    );
    */

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
};

export default updateTutor;
