import {
  GenericSubjectCategoryData, GenericSubjectData, isGenericSubjectCategoryData,
  isGenericSubjectData,
} from '@adopt-a-student/common';

const unlinkGenericSubjectAndSubjectCategory: ApiUnlinkGenericSubjectAndSubjectCategory = async (
  body,
  context
) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (!body || !body.subjectCategoryId || !body.genericSubjectId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not unlink documents because provided data is not valid"
    );

  const { genericSubjectId, subjectCategoryId } = body;

  const document1Props: RemoveDocumentLinkProps<GenericSubjectData, string> = {
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    dataPredicate: isGenericSubjectData,
    filterPredicate: (link) => link !== subjectCategoryId,
    linkReducer: (link) => link,
    linksPropName: "linkedGenericSubjectIds",
    id: genericSubjectId,
  };

  const document2Props: RemoveDocumentLinkProps<
    GenericSubjectCategoryData,
    string
  > = {
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
    filterPredicate: (link) => link !== genericSubjectId,
    linkReducer: (link) => link,
    linksPropName: "linkedGenericSubjectIds",
    id: subjectCategoryId,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return { message: "Success linking documents" };
};

export default unlinkGenericSubjectAndSubjectCategory;
