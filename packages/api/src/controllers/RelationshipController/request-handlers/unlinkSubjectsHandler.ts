import {
  GenericSubjectData, isGenericSubjectData, UnlinkSubjectsRequestBody, UnlinkSubjectsResponseBody,
} from '@adopt-a-student/common';

import { GENERIC_SUBJECT_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../../../utils/links/unlinkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const unlinkGenericSubjects: InternalHandler<
  UnlinkSubjectsRequestBody,
  UnlinkSubjectsResponseBody
> = async (body) => {
  const { subject1Id, subject2Id } = body;

  const commonDocumentProps: Omit<
    RemoveDocumentLinkProps<GenericSubjectData, string>,
    "documentId" | "linkToMutatePredicate"
  > = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    linksPropName: "relatedSubjects",
  };

  const document1Props: RemoveDocumentLinkProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    documentId: subject1Id,
    linkToMutatePredicate: (link) => link === subject2Id,
  };

  const document2Props: RemoveDocumentLinkProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    documentId: subject2Id,
    linkToMutatePredicate: (link) => link === subject1Id,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });
  // ? why is this not a ts error?
  return { message: "Success" };
};

export default unlinkGenericSubjects;
