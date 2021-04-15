import { TUTORS_COLLECTION_NAME } from '../constants';
import { ApiGetPrivateTutorDataHandler } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import { firestore } from '../utils/firebase-admin';
import readPrivateUserData from '../utils/readPrivateUserData';
import isPrivateTutorData from '../utils/type-predicates/isPrivateTutorData';
import verifyRequest from '../utils/verifyRequest';

const getPrivateTutorData: ApiGetPrivateTutorDataHandler = async (
  _,
  context
) => {
  const auth = verifyRequest(_, context);

  const path = createPath(TUTORS_COLLECTION_NAME, auth.uid);

  const data = await readPrivateUserData({
    dataPredicate: isPrivateTutorData,
    firestore,
    path,
  });

  return { data };
};

export default getPrivateTutorData;
