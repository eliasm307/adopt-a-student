import { TUTORS_COLLECTION_NAME } from '../constants';
import { ApiGetPrivateStudentDataHandler } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import { firestore } from '../utils/firebase-admin';
import readPrivateUserData from '../utils/readPrivateUserData';
import isPrivateStudentData from '../utils/type-predicates/isPrivateStudentData';
import verifyRequest from '../utils/verifyRequest';

const getPublicStudentData: ApiGetPrivateStudentDataHandler = async (
  _,
  context
) => {
  const auth = verifyRequest(_, context);

  const path = createPath(TUTORS_COLLECTION_NAME, auth.uid);

  const data = await readPrivateUserData({
    dataPredicate: isPrivateStudentData,
    firestore,
    path,
  });

  return {
    data,
  };
};

export default getPublicStudentData;
