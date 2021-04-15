import { PrivateTutorData } from '@adopt-a-student/common';

import { TUTORS_COLLECTION_NAME } from '../constants';
import { ApiCreateTutorHandler } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import { firestore, functionsHttps } from '../utils/firebase-admin';
import isPrivateTutorData from '../utils/type-predicates/isPrivateTutorData';
import verifyRequest from '../utils/verifyRequest';

const handler: ApiCreateTutorHandler = async (_data, context) => {
  const auth = verifyRequest(_data, context);

  // verify received data
  if (!isPrivateTutorData(_data))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not create tutor because provided data is not valid/complete"
    );

  // make sure data uses user id
  const data: PrivateTutorData = { ..._data, id: auth.uid };

  const documentPath = createPath(TUTORS_COLLECTION_NAME, auth.uid);

  // check if tutor already exists for this user
  const docRef = await firestore.doc(documentPath).get();

  if (docRef.exists)
    return {
      success: false,
      data,
      message:
        "Could not create tutor because a tutor already exists for the requesting user",
    };
  // ! dont throw error if there is an existing tutor, its not that deep
  /*
    throw new functionsHttps.HttpsError(
      "already-exists",
      "Could not create tutor because a tutor already exists for the requesting user"
    );
    */

  // create tutor
  try {
    await firestore.doc(documentPath).set(data);
    return { success: true, data };
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue creating the tutor",
      JSON.stringify(data)
    );
  }
};

export default handler;
