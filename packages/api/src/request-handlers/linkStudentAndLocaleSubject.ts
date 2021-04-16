import { GenericSubjectCategoryData, PrivateStudentData } from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME, SUBJECT_CATEGORY_COLLECTION_NAME } from '../constants';
import { ApiLinkStudentAndLocaleSubject } from '../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import linkDocuments, { DocumentLinkingProps } from '../utils/firebase/linkDocuments';
import isGenericSubjectCategoryData from '../utils/type-predicates/isGenericSubjectCategory';
import isPrivateStudentData from '../utils/type-predicates/isPrivateStudentData';
import verifyRequest from '../utils/verifyRequest';

const linkStudentAndLocaleSubject: ApiLinkStudentAndLocaleSubject = async (
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

  const document1Props: DocumentLinkingProps<PrivateStudentData, string> = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    linkCreater: (id) => id,
    linkReducer: (link) => link,
    linksPropName: "relatedGenericSubjectIds",
    id: genericSubjectId,
  };

  const document2Props: DocumentLinkingProps<
    GenericSubjectCategoryData,
    string
  > = {
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
    linkCreater: (id) => id,
    linkReducer: (link) => link,
    linksPropName: "genericSubjectIds",
    id: subjectCategoryId,
  };

  const [updatedDocument1, updatedDocument2] = await linkDocuments({
    document1Props,
    document2Props,
    firestore: firestoreAdmin,
  });

  return { message: "Success linking documents" };
};

export default linkStudentAndLocaleSubject;
