import {
  GenericSubjectCategoryData, GenericSubjectData, isGenericSubjectCategoryData,
  isGenericSubjectData, LinkSubjectAndSubjectCategoryRequestBody,
  LinkSubjectAndSubjectCategoryResponseBody,
} from '@adopt-a-student/common';

import {
  GENERIC_SUBJECT_COLLECTION_NAME, SUBJECT_CATEGORY_COLLECTION_NAME,
} from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../../../utils/links/linkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const linkSubjectAndSubjectCategory: InternalHandler<
  LinkSubjectAndSubjectCategoryRequestBody,
  LinkSubjectAndSubjectCategoryResponseBody
> = async (props) => {
  const {
    subjectId: genericSubjectId,
    categoryId: subjectCategoryId,
    locale,
  } = props;

  const document1Props: AddDocumentLinkProps<GenericSubjectData, string> = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    linkToAdd: subjectCategoryId,
    linkToMutatePredicate: (link) => link,
    linksPropName: "relatedSubjects",
    documentId: genericSubjectId,
  };

  const document2Props: AddDocumentLinkProps<
    GenericSubjectCategoryData,
    string
  > = {
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
    linkToAdd: genericSubjectId,
    linkToMutatePredicate: (link) => link,
    linksPropName: "relatedSubjects",
    documentId: subjectCategoryId,
  };

  const [updatedGenericSubject, updatedSubjectCategory] = await linkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return {} as LinkSubjectAndSubjectCategoryResponseBody;
};

export default linkSubjectAndSubjectCategory;
