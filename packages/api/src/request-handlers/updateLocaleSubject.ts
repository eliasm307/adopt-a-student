import { LOCALE_SUBJECT_COLLECTION_NAME } from '../constants';
import { ApiUpdateLocaleSubjectHandler } from '../declarations/interfaces';
import studentDataUpdater from '../utils/data-updaters/studentDataUpdater';
import { firestore, functionsHttps } from '../utils/firebase/firebase-admin';
import updateDocumentData from '../utils/firebase/updateDocumentData';
import isLocaleSubjectData from '../utils/type-predicates/isLocaleSubjectData';
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

  const updatedData = await updateDocumentData({
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    id: body.id,
    edits: body?.data,
    dataPredicate: isLocaleSubjectData,
    dataUpdater: studentDataUpdater,
    firestore,
  });

  return { data: updatedData };
};

export default updateLocaleSubject;
