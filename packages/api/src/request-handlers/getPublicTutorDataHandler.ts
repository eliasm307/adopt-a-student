import { TUTOR_COLLECTION_NAME } from '../constants';
import { ApiGetPublicTutorDataHandler } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import extractPublicTutorData from '../utils/extractPublicTutorData';
import { firestoreAdmin } from '../utils/firebase/firebase-admin';
import readPublicUserData from '../utils/readPublicUserData';
import verifyRequest from '../utils/verifyRequest';

const getPublicTutorData: ApiGetPublicTutorDataHandler = async (_, context) => {
  const auth = verifyRequest(_, context);

  const path = createPath(TUTOR_COLLECTION_NAME, auth.uid);

  const data = await readPublicUserData({
    dataPredicate: isPrivateTutorData,
    firestore: firestoreAdmin,
    path,
    publicDataExtractor: extractPublicTutorData,
  });

  return { data };
};

export default getPublicTutorData;
