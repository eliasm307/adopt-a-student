import {
  GetTutorRequestBody, GetTutorResponseBody, isPrivateTutorData,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import readPublicUserData from '../../../utils/readPublicUserData';
import verifyRequest from '../../../utils/verifyRequest';
import extractPublicTutorData from './utils/extractPublicTutorData';

// todo make controller automatically choose whether to use the private or public data if user id matches, just need to call a data extractor functionto get public data

const getPublicTutorData: FirebaseCallableFunctionHandler<
  GetTutorRequestBody,
  GetTutorResponseBody
> = async (_, context) => {
  const auth = verifyRequest(_, context);

  const path = createPath(TUTOR_COLLECTION_NAME, auth.uid);

  const tutor = await readPublicUserData({
    dataPredicate: isPrivateTutorData,
    firestore: firestoreAdmin,
    path,
    publicDataExtractor: extractPublicTutorData,
  });

  return { tutor };
};

export default getPublicTutorData;
