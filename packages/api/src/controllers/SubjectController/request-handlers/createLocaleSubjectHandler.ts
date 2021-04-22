import {
  CreateLocaleSubjectRequestBody as CreateLocaleSubjectRequestBody,
  CreateLocaleSubjectResponseBody as CreateLocaleSubjectResponseBody, isLocaleSubjectData,
} from '@adopt-a-student/common';

import {
  GENERIC_SUBJECT_COLLECTION_NAME, LOCALE_SUBJECT_COLLECTION_NAME,
} from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import createPath from '../../../utils/createPath';
import createDocument from '../../../utils/firebase/createDocument';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import newGuid from '../../../utils/newGuid';
import verifyRequest from '../../../utils/verifyRequest';
import { createLocaleSubjectId } from '../utils/localeSubjectId';

const createLocaleSubject: FirebaseCallableFunctionHandler<
  CreateLocaleSubjectRequestBody,
  CreateLocaleSubjectResponseBody
> = async (body, context) => {
  const auth = verifyRequest(body, context);

  if (!body?.data || !body.genericSubjectId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Data not provided"
    );

  const { genericId, locale, country } = body.data;

  const genericSubjectRef = await firestoreAdmin
    .doc(createPath(GENERIC_SUBJECT_COLLECTION_NAME, genericId))
    .get();

  if (!genericSubjectRef.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not create a locale subject for a generic subject that doesnt exist"
    );

  // id is generated from generic id
  const id = createLocaleSubjectId({ genericId: genericId, locale, country });

  const data = { ...body.data, id };

  const subject = await createDocument({
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    id,
    data,
    dataPredicate: isLocaleSubjectData,
    firestoreAdmin,
  });

  return {
    subject,
  } as CreateLocaleSubjectResponseBody;
};

export default createLocaleSubject;
