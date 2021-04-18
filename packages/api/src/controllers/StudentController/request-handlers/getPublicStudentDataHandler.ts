import {
  GetStudentRequestBody, GetStudentResponseBody, isPrivateStudentData,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import readPrivateUserData from '../../../utils/readPrivateUserData';
import verifyRequest from '../../../utils/verifyRequest';

// todo make controller automatically choose whether to use the private or public data if user id matches, just need to call a data extractor functionto get public data

const getPublicStudentData: FirebaseCallableFunctionHandler<
  GetStudentRequestBody,
  GetStudentResponseBody
> = async (body, context) => {
  const auth = verifyRequest(body, context);

  const path = createPath(TUTOR_COLLECTION_NAME, auth.uid);

  const student = await readPrivateUserData({
    dataPredicate: isPrivateStudentData,
    firestore: firestoreAdmin,
    path,
  });

  return { student };
};

export default getPublicStudentData;
