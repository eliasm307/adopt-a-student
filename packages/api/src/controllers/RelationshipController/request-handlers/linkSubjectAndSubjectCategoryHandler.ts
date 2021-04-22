import {
  GenericSubjectCategoryData, GenericSubjectData, isGenericSubjectCategoryData,
  isGenericSubjectData, LinkSubjectAndSubjectCategoryRequestBody,
  LinkSubjectAndSubjectCategoryResponseBody,
} from '@adopt-a-student/common';

import {
  GENERIC_SUBJECT_COLLECTION_NAME, SUBJECT_CATEGORY_COLLECTION_NAME,
} from '../../../constants';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../../../utils/links/linkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const linkSubjectAndSubjectCategory: InternalHandler<
  LinkSubjectAndSubjectCategoryRequestBody,
  LinkSubjectAndSubjectCategoryResponseBody
> = async (body, context) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (!body || !body.categoryId || !body.subjectId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not link documents because provided data is not valid"
    );

  const { subjectId: genericSubjectId, categoryId: subjectCategoryId } = body;

  const document1Props: AddDocumentLinkProps<GenericSubjectData, string> = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    linkToAdd: subjectCategoryId,
    linkReducer: (link) => link,
    linksPropName: "relatedSubjects",
    id: genericSubjectId,
  };

  const document2Props: AddDocumentLinkProps<
    GenericSubjectCategoryData,
    string
  > = {
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
    linkToAdd: genericSubjectId,
    linkReducer: (link) => link,
    linksPropName: "relatedSubjects",
    id: subjectCategoryId,
  };

  const [updatedDocument1, updatedDocument2] = await linkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });
  return { message: "Success linking documents" };
};

export default linkSubjectAndSubjectCategory;
