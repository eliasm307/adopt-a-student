import { PrivateTutorData } from '@adopt-a-student/common';

import { TUTORS_COLLECTION_NAME } from '../constants';
import { ApiGetPrivateStudentDataHandler } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import { firestore, functionsHttps } from '../utils/firebase-admin';
import verifyRequest from '../utils/verifyRequest';

const handler: ApiGetPrivateStudentDataHandler = async (_, context) => {
  const auth = verifyRequest(_, context);

  const documentPath = createPath(TUTORS_COLLECTION_NAME, auth.uid);

  // check if tutor already exists for this user
  const docSnapshot = await firestore.doc(documentPath).get();

  if (!docSnapshot.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not read data because a student profile doesnt exist for this user, create one first"
    );

  // read data
  try {
    // const newSnapshot = await docSnapshot.ref.get();

    const data = docSnapshot.data();

    if (!isPriva)
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
