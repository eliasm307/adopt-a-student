import {
  GetTutorRequestBody, GetTutorResponseBody, isPrivateTutorData,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import readPrivateUserData from '../../../utils/readPrivateUserData';
import verifyRequest from '../../../utils/verifyRequest';

const getPrivateTutorData: InternalHandler<
  GetTutorRequestBody,
  GetTutorResponseBody
> = async (props) => {
  const { id } = props;

  const path = createPath(TUTOR_COLLECTION_NAME, id);

  const tutor = await readPrivateUserData({
    dataPredicate: isPrivateTutorData,
    firestoreAdmin,
    path,
  });

  return { tutor };
};

export default getPrivateTutorData;
