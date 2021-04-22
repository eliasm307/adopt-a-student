import {
  GenericSubjectData, isGenericSubjectData, LinkSubjectsRequestBody, LinkSubjectsResponseBody,
} from '@adopt-a-student/common';

import { GENERIC_SUBJECT_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../../../utils/links/linkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

// todo firestoreAdmin should be a dependency through  props

const linkGenericSubjects: InternalHandler<
  LinkSubjectsRequestBody,
  LinkSubjectsResponseBody
> = async (props) => {
  const { subject1Id, subject2Id } = props;

  const commonDocumentProps: Omit<
    AddDocumentLinkProps<GenericSubjectData, string>,
    "id" | "linkToAdd"
  > = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    linkToMutatePredicate: (link) => link,
    linksPropName: "relatedSubjects",
  };

  const document1Props: AddDocumentLinkProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    linkToAdd: subject2Id,
    documentId: subject1Id,
  };

  const document2Props: AddDocumentLinkProps<GenericSubjectData, string> = {
    ...commonDocumentProps,
    linkToAdd: subject1Id,
    documentId: subject2Id,
  };

  const [updatedDocument1, updatedDocument2] = await linkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return {};
};
export default linkGenericSubjects;
