import {
  CreateStudentRequestBody, CreateStudentResponseBody, isPrivateStudentData, PrivateStudentData,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME } from '../../../constants';
import createDocument from '../../../utils/firebase/createDocument';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import verifyRequest from '../../../utils/verifyRequest';

const createStudent: InternalHandler<
  CreateStudentRequestBody,
  CreateStudentResponseBody
> = async (body, context) => {
  const auth = verifyRequest(body, context);

  if (!body)
    throw new functionsHttps.HttpsError(
      "invalid-argument",
      "body data not provided"
    );

  const { student: studentInput } = body;

  // make sure data uses user id
  const data = { ...studentInput, id: auth.uid };

  const student: PrivateStudentData = await createDocument({
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
