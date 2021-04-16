import { TUTOR_COLLECTION_NAME } from '../constants';
import { ApiGetPublicStudentDataHandler } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import extractPublicStudentData from '../utils/extractPublicStudentData';
import { firestore } from '../utils/firebase/firebase-admin';
import readPublicUserData from '../utils/readPublicUserData';
import isPrivateStudentData from '../utils/type-predicates/isPrivateStudentData';
import verifyRequest from '../utils/verifyRequest';

const handler: ApiGetPublicStudentDataHandler = async (_, context) => {
  const auth = verifyRequest(_, context);

  const path = createPath(TUTOR_COLLECTION_NAME, auth.uid);

  const data = await readPublicUserData({
    dataPredicate: isPrivateStudentData,
    firestore,
    path,
    publicDataExtractor: extractPublicStudentData,
  });

  return {
    data,
  };
};

export default handler;
