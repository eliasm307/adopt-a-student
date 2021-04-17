import { LocaleSubjectData, PrivateStudentData } from '@adopt-a-student/common';

import { LinkedLocaleSubjectData } from '../../common/src';
import { LOCALE_SUBJECT_COLLECTION_NAME, STUDENT_COLLECTION_NAME } from '../constants';
import { ApiLinkStudentAndLocaleSubject } from '../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../utils/links/unlinkDocuments';
import isLinkedLocaleSubjectData from '../utils/type-predicates/isLinkedLocaleSubjectData';
import isLocaleSubjectData from '../utils/type-predicates/isLocaleSubjectData';
import isPrivateStudentData from '../utils/type-predicates/isPrivateStudentData';
import verifyRequest from '../utils/verifyRequest';

const linkStudentAndLocaleSubject: ApiLinkStudentAndLocaleSubject = async (
  body,
  context
) => {
  const { uid } = verifyRequest(body, context);

  const data = body?.data;

  // verify received data
  if (!body || !body.data || !isLinkedLocaleSubjectData(data))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not link documents because provided data is not valid"
    );
  const { id: localesubjectId } = data;

  const document1Props: RemoveDocumentLinkProps<
    PrivateStudentData,
    LinkedLocaleSubjectData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    linkReducer: ({ id }) => id,
    filterPredicate: ({ id: link }) => link !== localesubjectId,
    linksPropName: "linkedLocaleSubjects",
    id: uid,
  };

  const document2Props: RemoveDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    filterPredicate: (link) => link !== uid,
    linkReducer: (link) => link,
    linksPropName: "linkedStudentIds",
    id: localesubjectId,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestore: firestoreAdmin,
  });

  return { message: "Success linking documents" };
};

export default linkStudentAndLocaleSubject;
