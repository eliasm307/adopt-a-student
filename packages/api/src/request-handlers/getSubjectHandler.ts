import { GENERIC_SUBJECT_COLLECTION_NAME, LOCALE_SUBJECT_COLLECTION_NAME } from '../constants';
import { ApiGetSubjectHandler } from '../declarations/interfaces';
import { firestore, functionsHttps } from '../utils/firebase-admin';
import getDocumentData from '../utils/getDocumentData';
import isGenericSubjectData from '../utils/type-predicates/isGenericSubjectData';
import isLocaleSubjectData from '../utils/type-predicates/isLocaleSubjectData';
import verifyRequest from '../utils/verifyRequest';

const getSubjectHandler: ApiGetSubjectHandler = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.localeSubjectId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get subjects because provided data is missing subject id"
    );

  const localeSubjectId = data.localeSubjectId;

  const localeSubject = await getDocumentData({
    firestore,
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    id: localeSubjectId,
    dataPredicate: isLocaleSubjectData,
  });

  const genericSubject = await getDocumentData({
    firestore,
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    id: localeSubject.genericSubjectId,
    dataPredicate: isGenericSubjectData,
  });

  return {
    data: {
      genericSubject,
      localeSubject,
    },
  };
};

export default getSubjectHandler;
