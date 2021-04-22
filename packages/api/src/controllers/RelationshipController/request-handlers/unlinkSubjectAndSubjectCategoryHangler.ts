import {
  GenericSubjectCategoryData, GenericSubjectData, isGenericSubjectCategoryData,
  isGenericSubjectData, UnlinkSubjectAndSubjectCategoryRequestBody,
  UnlinkSubjectAndSubjectCategoryResponseBody,
} from '@adopt-a-student/common';

import {
  GENERIC_SUBJECT_COLLECTION_NAME, SUBJECT_CATEGORY_COLLECTION_NAME,
} from '../../../constants';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../../../utils/links/unlinkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const unlinkSubjectAndSubjectCategoryHandler: InternalHandler<
  UnlinkSubjectAndSubjectCategoryRequestBody,
  UnlinkSubjectAndSubjectCategoryResponseBody
> = async (body, context) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (!body || !body.categoryId || !body.subjectId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not unlink documents because provided data is not valid"
    );

  const { subjectId, categoryId } = body;

  const document1Props: RemoveDocumentLinkProps<GenericSubjectData, string> = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    filterPredicate: (link) => link !== categoryId,
    linkReducer: (link) => link,
    linksPropName: "relatedCategories",
    id: subjectId,
  };

  const document2Props: RemoveDocumentLinkProps<
    GenericSubjectCategoryData,
    string
  > = {
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
    filterPredicate: (link) => link !== subjectId,
    linkReducer: (link) => link,
    linksPropName: "relatedSubjects",
    id: categoryId,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return { message: "Success linking documents" };
};

export default unlinkSubjectAndSubjectCategoryHandler;
