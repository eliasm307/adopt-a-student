import {
  GetSubjectRequestBody, GetSubjectResponseBody, isGenericSubjectData, isLocaleSubjectData,
} from '@adopt-a-student/common';

import {
  GENERIC_SUBJECT_COLLECTION_NAME, LOCALE_SUBJECT_COLLECTION_NAME,
} from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import getDocumentData from '../../../utils/firebase/getDocumentData';
import verifyRequest from '../../../utils/verifyRequest';
import {
  createLocaleSubjectId as createLocaleSubjectDocumentId, isLocaleSubjectId,
} from '../utils/localeSubjectDocumentId';

const getSubjectHandler: FirebaseCallableFunctionHandler<
  GetSubjectRequestBody,
  GetSubjectResponseBody
> = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.id || !data.country || !data.locale)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get subjects because provided data is missing subject id"
    );

  const { id, country, locale } = data;

  if (!isLocaleSubjectId(id))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Id should be a locale subject id in the format [genericId]-[locale]-[country]"
    );

  const localeSubject = await getDocumentData({
    firestoreAdmin,
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    id: createLocaleSubjectDocumentId({ country, genericId: id, locale }), // todo see if any other locale subject queries need to use this function instead of trying to use the raw id
    dataPredicate: isLocaleSubjectData,
  });

  const { relatedCategories, relatedSubjects } = await getDocumentData({
    firestoreAdmin,
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    id,
    dataPredicate: isGenericSubjectData,
  });

  return {
    localeSubject,
    relatedCategories,
    relatedSubjects,
  } as GetSubjectResponseBody;
};

export default getSubjectHandler;
