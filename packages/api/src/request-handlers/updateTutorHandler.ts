import { PrivateTutorData } from '@adopt-a-student/common';

import { TUTORS_COLLECTION_NAME } from '../constants';
import { ApiUpdateTutorDataHandler } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import { firestore, functionsHttps } from '../utils/firebase-admin';
import isPartialPrivateTutorData from '../utils/type-predicates/isPartialPrivateTutorData';
import verifyRequest from '../utils/verifyRequest';

const handler: ApiUpdateTutorDataHandler = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!isPartialPrivateTutorData(data))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update tutor because provided data is not valid"
    );

  const documentPath = createPath(TUTORS_COLLECTION_NAME, auth.uid);

  // check if tutor already exists for this user
  const docSnapshot = await firestore.doc(documentPath).get();

  if (!docSnapshot.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not edit tutor because a tutor profile doesnt exist for this user, create one first"
    );

  // edit tutor
  try {
    await docSnapshot.ref.update(data);
    const newSnapshot = await docSnapshot.ref.get();

    return {
      success: true,
      data: newSnapshot.data() as PrivateTutorData,
    };
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue creating the tutor",
      JSON.stringify(data)
    );
  }
};

export default handler;
