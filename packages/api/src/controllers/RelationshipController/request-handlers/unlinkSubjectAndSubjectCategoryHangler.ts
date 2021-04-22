import {
  GenericSubjectCategoryData, GenericSubjectData, isGenericSubjectCategoryData,
  isGenericSubjectData, UnlinkSubjectAndSubjectCategoryRequestBody,
  UnlinkSubjectAndSubjectCategoryResponseBody,
} from '@adopt-a-student/common';

import {
  GENERIC_SUBJECT_COLLECTION_NAME, SUBJECT_CATEGORY_COLLECTION_NAME,
} from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../../../utils/links/unlinkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const unlinkSubjectAndSubjectCategoryHandler: InternalHandler<
  UnlinkSubjectAndSubjectCategoryRequestBody,
  UnlinkSubjectAndSubjectCategoryResponseBody
> = async (body) => {
  const { subjectId, categoryId } = body;

  const document1Props: RemoveDocumentLinkProps<GenericSubjectData, string> = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    linkToMutatePredicate: (link) => link === categoryId,
    linksPropName: "relatedCategories",
    documentId: subjectId,
  };

  const document2Props: RemoveDocumentLinkProps<
    GenericSubjectCategoryData,
    string
  > = {
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
    linkToMutatePredicate: (link) => link === subjectId,
    linksPropName: "relatedSubjects",
    documentId: categoryId,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return {};
};

export default unlinkSubjectAndSubjectCategoryHandler;
