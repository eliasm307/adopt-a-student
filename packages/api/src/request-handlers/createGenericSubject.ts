import { GENERIC_SUBJECT_COLLECTION_NAME } from '../constants';
import { ApiCreateGenericSubjectHandler } from '../declarations/interfaces';
import createDocument from '../utils/createDocument';
import { firestore } from '../utils/firebase-admin';
import isPrivateStudentData from '../utils/type-predicates/isPrivateStudentData';
import verifyRequest from '../utils/verifyRequest';

const createGenericSubject: ApiCreateGenericSubjectHandler = async (
  body,
  context
) => {
  const auth = verifyRequest(body, context);

  return createDocument({
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    id: auth.uid,
    data,
    dataPredicate: isPrivateStudentData,
    firestore,
  });
};

export default createGenericSubject;
