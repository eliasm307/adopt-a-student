import { LocaleSubjectData, PrivateStudentData } from '@adopt-a-student/common';

import { LinkedLocaleSubjectData } from '../../common/src';
import { LOCALE_SUBJECT_COLLECTION_NAME, STUDENT_COLLECTION_NAME } from '../constants';
import { ApiLinkStudentAndLocaleSubject } from '../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import unlinkDocuments, { DocumentLinkingProps } from '../utils/links/linkDocuments';
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

  const document1Props: DocumentLinkingProps<
    PrivateStudentData,
    LinkedLocaleSubjectData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    linkToAdd: data,
    linkReducer: (link) => link.id,
    linksPropName: "linkedLocaleSubjects",
    id: uid,
  };

  const document2Props: DocumentLinkingProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    linkToAdd: uid,
    linkReducer: (link) => link,
    linksPropName: "linkedStudentIds",
    id: data.id,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestore: firestoreAdmin,
  });

  return { message: "Success linking documents" };
};

export default linkStudentAndLocaleSubject;
