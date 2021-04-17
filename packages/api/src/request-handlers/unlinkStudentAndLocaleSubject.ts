import {
  LinkedLocaleSubjectData, LocaleSubjectData, PrivateStudentData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME, STUDENT_COLLECTION_NAME } from '../constants';
import { ApiUnlinkStudentAndLocaleSubject } from '../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../utils/links/unlinkDocuments';
import verifyRequest from '../utils/verifyRequest';

const unlinkStudentAndLocaleSubject: ApiUnlinkStudentAndLocaleSubject = async (
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
    PrivateStudentData,
    LinkedLocaleSubjectData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    linkReducer: ({ id }) => id,
    filterPredicate: ({ id: link }) => link !== localeSubjectId,
    linksPropName: "linkedLocaleSubjects",
    id: uid,
  };

  const document2Props: RemoveDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    filterPredicate: (link) => link !== uid,
    linkReducer: (link) => link,
    linksPropName: "linkedStudentIds",
    id: localeSubjectId,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestore: firestoreAdmin,
  });

  return { message: "Success" };
};

export default unlinkStudentAndLocaleSubject;
