import { GenericSubjectData } from '@adopt-a-student/common';

import { GENERIC_SUBJECT_COLLECTION_NAME } from '../constants';
import { ApiLinkGenericSubjects } from '../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../utils/links/linkDocuments';
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
    AddDocumentLinkProps<GenericSubjectData, string>,
    "id" | "linkToAdd"
  > = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    linkReducer: (link) => link,
    linksPropName: "linkedGenericSubjectIds",
  };

  const document1Props: AddDocumentLinkProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    linkToAdd: genericSubject2Id,
    id: genericSubject1Id,
  };

  const document2Props: AddDocumentLinkProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    linkToAdd: genericSubject1Id,
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
