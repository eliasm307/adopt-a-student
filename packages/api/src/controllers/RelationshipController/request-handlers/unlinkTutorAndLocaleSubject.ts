import {
  isLocaleSubjectData, isPrivateTutorData, LocaleSubjectData, PrivateTutorData, UserSubjectData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../../../constants';
import { ApiUnlinkTutorAndLocaleSubject } from '../../../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../../../utils/links/unlinkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const linkStudentAndLocaleSubject: ApiUnlinkTutorAndLocaleSubject = async (
  body,
  context
) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (!body || !body.localeSubjectId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not link documents because provided data is not valid"
    );
  const { localeSubjectId } = body;

  const document1Props: RemoveDocumentLinkProps<
    PrivateTutorData,
    UserSubjectData
  > = {
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    filterPredicate: ({ id: linkId }) => linkId !== localeSubjectId,
    linkReducer: ({ id }) => id,
    linksPropName: "relatedSubjects",
    id: uid,
  };

  const document2Props: RemoveDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    filterPredicate: (linkId) => linkId !== uid,
    linkReducer: (link) => link,
    linksPropName: "relatedStudentIds",
    id: localeSubjectId,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestore: firestoreAdmin,
  });

  return { message: "Success" };
};

export default linkStudentAndLocaleSubject;
