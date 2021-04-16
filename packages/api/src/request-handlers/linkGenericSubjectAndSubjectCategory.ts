import { GenericSubjectCategoryData, GenericSubjectData } from '@adopt-a-student/common';

import { GENERIC_SUBJECT_COLLECTION_NAME, SUBJECT_CATEGORY_COLLECTION_NAME } from '../constants';
import { ApiLinkGenericSubjectAndSubjectCategory } from '../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import linkDocuments, { DocumentLinkingProps } from '../utils/firebase/linkDocuments';
import isGenericSubjectCategoryData from '../utils/type-predicates/isGenericSubjectCategory';
import isGenericSubjectData from '../utils/type-predicates/isGenericSubjectData';
import verifyRequest from '../utils/verifyRequest';

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

  const document1Props: DocumentLinkingProps<GenericSubjectData, string> = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    linkCreater: (id) => id,
    linkReducer: (link) => link,
    linksPropName: "relatedGenericSubjectIds",
    id: genericSubjectId,
  };

  const document2Props: DocumentLinkingProps<
    GenericSubjectCategoryData,
    string
  > = {
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
    linkCreater: (id) => id,
    linkReducer: (link) => link,
    linksPropName: "genericSubjectIds",
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
