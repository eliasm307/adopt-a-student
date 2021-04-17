import { TUTOR_COLLECTION_NAME } from '../constants';
import { ApiGetPrivateTutorDataHandler } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import { firestoreAdmin } from '../utils/firebase/firebase-admin';
import readPrivateUserData from '../utils/readPrivateUserData';
import verifyRequest from '../utils/verifyRequest';

const getPrivateTutorData: ApiGetPrivateTutorDataHandler = async (
  _,
  context
) => {
  const auth = verifyRequest(_, context);

  const path = createPath(TUTOR_COLLECTION_NAME, auth.uid);

  const data = await readPrivateUserData({
    dataPredicate: isPrivateTutorData,
    firestore: firestoreAdmin,
    path,
  });

  return { data };
};

export default getPrivateTutorData;
