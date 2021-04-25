import {
  GetStudentRequestBody, GetStudentResponseBody, isPrivateStudentData,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import readPrivateUserData from '../../../utils/readPrivateUserData';
import readPublicUserData from '../../../utils/readPublicUserData';
import extractPublicStudentData from '../utils/extractPublicStudentData';

const getPrivateStudentData: InternalHandler<
  GetStudentRequestBody,
  GetStudentResponseBody
> = async ({ id }) => {
  const path = createPath(STUDENT_COLLECTION_NAME, id);

  console.log(__filename, { id, path });

  const student = await readPrivateUserData({
    dataPredicate: isPrivateStudentData,
    firestoreAdmin,
    path,
  });

  console.log(__filename, "result", { student });

  return {
    student,
  };
};

export default getPrivateStudentData;
