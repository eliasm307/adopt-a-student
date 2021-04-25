import {
  GetStudentRequestBody, GetStudentResponseBody, isPrivateStudentData,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import readPrivateUserData from '../../../utils/readPrivateUserData';
import readPublicUserData from '../../../utils/readPublicUserData';
import verifyRequest from '../../../utils/verifyRequest';
import extractPublicStudentData from '../utils/extractPublicStudentData';

const getPublicStudentData: InternalHandler<
  GetStudentRequestBody,
  GetStudentResponseBody
> = async ({ id }) => {
  const path = createPath(STUDENT_COLLECTION_NAME, id);

  const student = await readPublicUserData({
    dataPredicate: isPrivateStudentData,
    firestoreAdmin,
    path,
    publicDataExtractor: extractPublicStudentData,
  });

  return { student };
};

export default getPublicStudentData;
