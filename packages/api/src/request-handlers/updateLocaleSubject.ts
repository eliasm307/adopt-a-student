import { isLocaleSubjectData } from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME } from '../constants';
import { ApiUpdateLocaleSubjectHandler } from '../declarations/interfaces';
import localeSubjectDataUpdater from '../utils/data-updaters/localeSubjectDataUpdater';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import updateDocumentData from '../utils/firebase/updateDocumentData';
import verifyRequest from '../utils/verifyRequest';

const updateLocaleSubject: ApiUpdateLocaleSubjectHandler = async (
  body,
  context
) => {
  const auth = verifyRequest(body, context);

  // verify received data
  if (
    !body ||
    !body.data ||
    typeof body.data !== "object" ||
    !Object.keys(body.data).length ||
    !body.id
  )
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update tutor because provided data is not valid"
    );

  const { data, id } = body;

  // id immutable
  const edits = { ...data, id };

  const localeSubject = await updateDocumentData({
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    id: body.id,
    edits,
    dataPredicate: isLocaleSubjectData,
    dataUpdater: localeSubjectDataUpdater,
    firestore: firestoreAdmin,
  });

  return { data: { localeSubject } };
};

export default updateLocaleSubject;
