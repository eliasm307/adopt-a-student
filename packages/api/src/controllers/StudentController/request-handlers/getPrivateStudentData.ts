import {
  GetStudentRequestBody, GetStudentResponseBody, isPrivateStudentData,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import readPublicUserData from '../../../utils/readPublicUserData';
import extractPublicStudentData from '../utils/extractPublicStudentData';

const getPrivateStudentData: InternalHandler<
  GetStudentRequestBody & AuthData,
  GetStudentResponseBody
> = async ({ id, uid }) => {
  const path = createPath(TUTOR_COLLECTION_NAME, uid);

  const student = await readPublicUserData({
    dataPredicate: isPrivateStudentData,
    firestoreAdmin,
    path,
    publicDataExtractor: extractPublicStudentData,
  });

  return {
    student,
  };
};

export default getPrivateStudentData;
