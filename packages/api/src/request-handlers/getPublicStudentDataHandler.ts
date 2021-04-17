import { isPrivateStudentData } from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../constants';
import { ApiGetPrivateStudentDataHandler } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import { firestoreAdmin } from '../utils/firebase/firebase-admin';
import readPrivateUserData from '../utils/readPrivateUserData';
import verifyRequest from '../utils/verifyRequest';

const getPublicStudentData: ApiGetPrivateStudentDataHandler = async (
  _,
  context
) => {
  const auth = verifyRequest(_, context);

  const path = createPath(TUTOR_COLLECTION_NAME, auth.uid);

  const data = await readPrivateUserData({
    dataPredicate: isPrivateStudentData,
    firestore: firestoreAdmin,
    path,
  });

  return {
    data,
  };
};

export default getPublicStudentData;
