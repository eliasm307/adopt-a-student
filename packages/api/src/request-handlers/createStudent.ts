import { STUDENT_COLLECTION_NAME } from '../constants';
import { ApiCreateStudentHandler } from '../declarations/interfaces';
import createDocument from '../utils/firebase/createDocument';
import { firestoreAdmin } from '../utils/firebase/firebase-admin';
import isPrivateStudentData from '../utils/type-predicates/isPrivateStudentData';
import verifyRequest from '../utils/verifyRequest';

const createStudent: ApiCreateStudentHandler = async (body, context) => {
  const auth = verifyRequest(body, context);

  // make sure data uses user id
  const data = { ...body?.data, id: auth.uid };

  const student = await createDocument({
    collectionPath: STUDENT_COLLECTION_NAME,
    id: auth.uid,
    data,
    dataPredicate: isPrivateStudentData,
    firestore: firestoreAdmin,
  });

  return {
    data: student,
  };
};

export default createStudent;
