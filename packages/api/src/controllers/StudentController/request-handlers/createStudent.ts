import {
  CreateStudentRequestBody, CreateStudentResponseBody, isPrivateStudentData,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import createDocument from '../../../utils/firebase/createDocument';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import verifyRequest from '../../../utils/verifyRequest';

const createStudent: FirebaseCallableFunctionHandler<
  CreateStudentRequestBody,
  CreateStudentResponseBody
> = async (body, context) => {
  const auth = verifyRequest(body, context);

  // make sure data uses user id
  const data = { ...body?.student, id: auth.uid };

  const student = await createDocument({
    collectionPath: STUDENT_COLLECTION_NAME,
    id: auth.uid,
    data,
    dataPredicate: isPrivateStudentData,
    firestoreAdmin,
  });

  return {
    student,
  };
};

export default createStudent;
