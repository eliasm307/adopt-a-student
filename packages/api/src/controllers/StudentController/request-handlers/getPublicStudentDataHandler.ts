import {
  GetStudentRequestBody, GetStudentResponseBody, isPrivateStudentData,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import readPrivateUserData from '../../../utils/readPrivateUserData';
import verifyRequest from '../../../utils/verifyRequest';

const getPublicStudentData: InternalHandler<
  GetStudentRequestBody,
  GetStudentResponseBody
> = async ({ id }) => {
  const path = createPath(TUTOR_COLLECTION_NAME, id);

  const student = await readPrivateUserData({
    dataPredicate: isPrivateStudentData,
    firestoreAdmin,
    path,
  });

  return { student };
};

export default getPublicStudentData;
