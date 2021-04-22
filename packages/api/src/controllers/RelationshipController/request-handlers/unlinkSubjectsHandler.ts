import {
  GenericSubjectData, isGenericSubjectData, UnlinkSubjectsRequestBody, UnlinkSubjectsResponseBody,
} from '@adopt-a-student/common';

import { GENERIC_SUBJECT_COLLECTION_NAME } from '../../../constants';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../../../utils/links/unlinkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const unlinkGenericSubjects: InternalHandler<
  UnlinkSubjectsRequestBody,
  UnlinkSubjectsResponseBody
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
    RemoveDocumentLinkProps<GenericSubjectData, string>,
    "id" | "filterPredicate"
  > = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    linkReducer: (link) => link,
    linksPropName: "relatedSubjects",
  };

  const document1Props: RemoveDocumentLinkProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    filterPredicate: (link) => link !== subject2Id,

    documentId: subject1Id,
  };

  const document2Props: RemoveDocumentLinkProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    filterPredicate: (link) => link !== subject1Id,
    documentId: subject2Id,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return { message: "Success" };
};

export default unlinkGenericSubjects;
