import {
  CreateLocaleSubjectRequestBody as CreateLocaleSubjectRequestBody,
  CreateLocaleSubjectResponseBody as CreateLocaleSubjectResponseBody, isLocaleSubjectData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import createDocument from '../../../utils/firebase/createDocument';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import newGuid from '../../../utils/newGuid';
import verifyRequest from '../../../utils/verifyRequest';

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

  const id = newGuid();

  const data = { ...body.data, id };

  // todo this should only allow creating/editting locale subjects if a generic subject exists

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
