import {
  GenericSubjectCategoryData, GenericSubjectData, isGenericSubjectCategoryData,
  isGenericSubjectData,
} from '@adopt-a-student/common';

import {
  GENERIC_SUBJECT_COLLECTION_NAME, SUBJECT_CATEGORY_COLLECTION_NAME,
} from '../../../constants';
import { ApiLinkGenericSubjectAndSubjectCategory } from '../../../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../../../utils/links/linkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const linkGenericSubjectAndSubjectCategory: ApiLinkGenericSubjectAndSubjectCategory = async (
  body,
  context
) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (!body || !body.subjectCategoryId || !body.genericSubjectId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not link documents because provided data is not valid"
    );

  const { genericSubjectId, subjectCategoryId } = body;

  const document1Props: AddDocumentLinkProps<GenericSubjectData, string> = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    linkToAdd: subjectCategoryId,
    linkReducer: (link) => link,
    linksPropName: "linkedGenericSubjectIds",
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
    linksPropName: "linkedGenericSubjectIds",
    id: subjectCategoryId,
  };

  const [updatedDocument1, updatedDocument2] = await linkDocuments({
    document1Props,
    document2Props,
    firestore: firestoreAdmin,
  });

  return { message: "Success linking documents" };
};

export default linkGenericSubjectAndSubjectCategory;
