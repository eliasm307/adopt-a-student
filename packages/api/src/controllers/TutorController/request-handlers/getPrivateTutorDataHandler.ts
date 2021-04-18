import {
  GetTutorRequestBody, GetTutorResponseBody, isPrivateTutorData,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import readPrivateUserData from '../../../utils/readPrivateUserData';
import verifyRequest from '../../../utils/verifyRequest';

const getPrivateTutorData: FirebaseCallableFunctionHandler<
  GetTutorRequestBody,
  GetTutorResponseBody
> = async (_, context) => {
  const auth = verifyRequest(_, context);

  const path = createPath(TUTOR_COLLECTION_NAME, auth.uid);

  const tutor = await readPrivateUserData({
    dataPredicate: isPrivateTutorData,
    FirestoreAdmin,
    path,
  });

  return { tutor };
};

export default getPrivateTutorData;