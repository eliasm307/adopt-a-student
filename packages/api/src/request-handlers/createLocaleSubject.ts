import { isLocaleSubjectData } from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME } from '../constants';
import { ApiCreateLocaleSubjectHandler } from '../declarations/interfaces';
import createDocument from '../utils/firebase/createDocument';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import newGuid from '../utils/newGuid';
import verifyRequest from '../utils/verifyRequest';

const createLocaleSubject: ApiCreateLocaleSubjectHandler = async (
  body,
  context
) => {
  const auth = verifyRequest(body, context);

  const id = newGuid();

  if (!body?.data)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Data not provided"
    );

  const data = { ...body.data, id };

  const localeSubject = await createDocument({
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    id,
    data,
    dataPredicate: isLocaleSubjectData,
    firestore: firestoreAdmin,
  });

  return {
    data: { localeSubject },
  };
};

export default createLocaleSubject;
