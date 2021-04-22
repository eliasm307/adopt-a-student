import {
  CreateStudentRequestBody, CreateStudentResponseBody, isPrivateStudentData, PrivateStudentData,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import createDocument from '../../../utils/firebase/createDocument';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import verifyRequest from '../../../utils/verifyRequest';

const createStudentHandler: InternalHandler<
  CreateStudentRequestBody & AuthData,
  CreateStudentResponseBody
> = async (props) => {
  const { student: studentInput, id } = props;

  // make sure data uses user id
  const data = { ...studentInput, id };

  const student: PrivateStudentData = await createDocument({
    collectionPath: STUDENT_COLLECTION_NAME,
    id,
    data,
    dataPredicate: isPrivateStudentData,
    firestoreAdmin,
  });

  return {
    student,
  };
};

export default createStudentHandler;
