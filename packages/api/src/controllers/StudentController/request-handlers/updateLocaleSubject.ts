import {
  isLocaleSubjectData, UpdateLocaleSubjectRequestBody, UpdateLocaleSubjectResponseBody,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import localeSubjectDataUpdater from '../../../utils/data-updaters/localeSubjectDataUpdater';
import { functionsHttps } from '../../../utils/firebase/firebase-admin';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

const updateLocaleSubject: FirebaseCallableFunctionHandler<
  UpdateLocaleSubjectRequestBody,
  UpdateLocaleSubjectResponseBody
> = async (body, context) => {
  const auth = verifyRequest(body, context);

  // verify received data
  if (
    !body ||
    !body.updates ||
    typeof body.updates !== "object" ||
    !Object.keys(body.updates).length ||
    !body.id
  )
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update tutor because provided data is not valid"
    );

  const { updates, id } = body;

  const result = await updateDocumentData({
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    id,
    updates: { ...updates, id },
    dataPredicate: isLocaleSubjectData,
    dataUpdater: localeSubjectDataUpdater,
    FirestoreAdmin,
  });

  return { result };
};

export default updateLocaleSubject;
