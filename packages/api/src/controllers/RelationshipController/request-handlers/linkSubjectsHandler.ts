import {
  GenericSubjectData, isGenericSubjectData, LinkSubjectsRequestBody, LinkSubjectsResponseBody,
} from '@adopt-a-student/common';

import { GENERIC_SUBJECT_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../../../utils/links/linkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

// todo firestoreAdmin should be a dependency through  props

const linkGenericSubjects: FirebaseCallableFunctionHandler<
  LinkSubjectsRequestBody,
  LinkSubjectsResponseBody
> = async (body, context) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (!body || !body.subject1Id || !body.subject2Id)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not link documents because provided data is not valid"
    );

  const { subject1Id, subject2Id } = body;

  const commonDocumentProps: Omit<
    AddDocumentLinkProps<GenericSubjectData, string>,
    "id" | "linkToAdd"
  > = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    linkReducer: (link) => link,
    linksPropName: "relatedSubjects",
  };

  const document1Props: AddDocumentLinkProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    linkToAdd: subject2Id,
    id: subject1Id,
  };

  const document2Props: AddDocumentLinkProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    linkToAdd: subject1Id,
    id: subject2Id,
  };

  const [updatedDocument1, updatedDocument2] = await linkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return { message: "Success linking documents" };
};
export default linkGenericSubjects;
