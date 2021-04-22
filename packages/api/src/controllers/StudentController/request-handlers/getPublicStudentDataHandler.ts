import {
  GetStudentRequestBody, GetStudentResponseBody, isPrivateStudentData,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import readPrivateUserData from '../../../utils/readPrivateUserData';
import verifyRequest from '../../../utils/verifyRequest';

// todo make controller automatically choose whether to use the private or public data if user id matches, just need to call a data extractor functionto get public data

const getPublicStudentData: InternalHandler<
  GetStudentRequestBody & AuthData,
  GetStudentResponseBody
> = async ({ id, uid }) => {
  const path = createPath(TUTOR_COLLECTION_NAME, uid);

  const student = await readPrivateUserData({
    dataPredicate: isPrivateStudentData,
    firestoreAdmin,
    path,
  });

  return { student };
};

export default getPublicStudentData;
