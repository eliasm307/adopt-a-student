import { isGenericSubjectData, isLocaleSubjectData } from '@adopt-a-student/common';

import {
  GENERIC_SUBJECT_COLLECTION_NAME, LOCALE_SUBJECT_COLLECTION_NAME,
} from '../../../constants';
import { ApiGetSubjectHandler } from '../../../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import getDocumentData from '../../../utils/firebase/getDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

export interface GetSubjectRequestBody {}
export interface GetSubjectResponseBody {}
const getSubject: ApiGetSubjectHandler = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.localeSubjectId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get subjects because provided data is missing subject id"
    );

  const localeSubjectId = data.localeSubjectId;

  const localeSubject = await getDocumentData({
    firestoreAdmin: FirestoreAdmin,
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    id: localeSubjectId,
    dataPredicate: isLocaleSubjectData,
  });

  const genericSubject = await getDocumentData({
    firestoreAdmin: FirestoreAdmin,
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    id: localeSubject.parentId,
    dataPredicate: isGenericSubjectData,
  });

  return {
    data: {
      genericSubject,
      localeSubject,
    },
  };
};

export default getSubject;
