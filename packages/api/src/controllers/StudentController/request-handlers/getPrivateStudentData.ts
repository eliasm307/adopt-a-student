import {
  GetStudentRequestBody, GetStudentResponseBody, isPrivateStudentData,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import readPublicUserData from '../../../utils/readPublicUserData';
import verifyRequest from '../../../utils/verifyRequest';
import extractPublicStudentData from '../utils/extractPublicStudentData';

const handler: FirebaseCallableFunctionHandler<
  GetStudentRequestBody,
  GetStudentResponseBody
> = async (_, context) => {
  const auth = verifyRequest(_, context);

  const path = createPath(TUTOR_COLLECTION_NAME, auth.uid);

  const student = await readPublicUserData({
    dataPredicate: isPrivateStudentData,
    firestore: firestoreAdmin,
    path,
    publicDataExtractor: extractPublicStudentData,
  });

  return {
    student,
  };
};

export default handler;
