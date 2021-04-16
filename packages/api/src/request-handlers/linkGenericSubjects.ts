import { GenericSubjectData } from '@adopt-a-student/common';

import { GENERIC_SUBJECT_COLLECTION_NAME } from '../constants';
import { ApiLinkGenericSubjects } from '../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import linkDocuments, { DocumentLinkingProps } from '../utils/firebase/linkDocuments';
import isGenericSubjectData from '../utils/type-predicates/isGenericSubjectData';
import verifyRequest from '../utils/verifyRequest';

const linkGenericSubjects: ApiLinkGenericSubjects = async (body, context) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (!body || !body.genericSubject1Id || !body.genericSubject2Id)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not link documents because provided data is not valid"
    );

  const { genericSubject1Id, genericSubject2Id } = body;

  const commonDocumentProps: Omit<
    DocumentLinkingProps<GenericSubjectData, string>,
    "id"
  > = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    linkCreater: (id) => id,
    linkReducer: (link) => link,
    linksPropName: "relatedGenericSubjectIds",
  };

  const document1Props: DocumentLinkingProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    id: genericSubject1Id,
  };

  const document2Props: DocumentLinkingProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    id: genericSubject2Id,
  };

  const [updatedDocument1, updatedDocument2] = await linkDocuments({
    document1Props,
    document2Props,
    firestore: firestoreAdmin,
  });

  return { message: "Success linking documents" };
};

export default linkGenericSubjects;
