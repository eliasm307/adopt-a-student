import {
  GetTutorRequestBody, GetTutorResponseBody, isPrivateTutorData,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import createPath from '../../../utils/createPath';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import readPrivateUserData from '../../../utils/readPrivateUserData';
import verifyRequest from '../../../utils/verifyRequest';

const getPrivateTutorData: InternalHandler<
  GetTutorRequestBody,
  GetTutorResponseBody
> = async (_, context) => {
  const auth = verifyRequest(_, context);
  const path = createPath(TUTOR_COLLECTION_NAME, auth.uid);

  const tutor = await readPrivateUserData({
    dataPredicate: isPrivateTutorData,
    firestoreAdmin,
    path,
  });

  return { tutor };
};

export default getPrivateTutorData;
