import { GenericSubjectCategoryData } from '../../common/src';
import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../constants';
import { ApiUpdateLocaleSubjectCategoryHandler } from '../declarations/interfaces';
import { firestore, functionsHttps } from '../utils/firebase/firebase-admin';
import updateDocumentData from '../utils/firebase/updateDocumentData';
import isGenericSubjectCategoryData from '../utils/type-predicates/isGenericSubjectCategory';
import verifyRequest from '../utils/verifyRequest';

const updateLocaleSubjectCategory: ApiUpdateLocaleSubjectCategoryHandler = async (
  body,
  context
) => {
  const auth = verifyRequest(body, context);

  // verify received data
  if (
    !body ||
    !body.data ||
    typeof body.data !== "object" ||
    !Object.keys(body.data).length ||
    !body.id ||
    !body.locale
  )
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update document because provided data is not valid"
    );

  const { id, locale, data: localeCategoryEdits } = body;

  const genericCategoryEdits: Partial<GenericSubjectCategoryData> = {
    localeSubjectCategories: { [locale]: localeCategoryEdits },
  } as Partial<GenericSubjectCategoryData>;

  /*
  const genericSubjectCategory = await getDocumentData({
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
    firestore,
    id,
  });
  */

  // update just the locale subject category of the generic
  const localeSubject = await updateDocumentData({
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    id,
    edits: genericCategoryEdits,
    dataPredicate: isGenericSubjectCategoryData,
    dataUpdater: genericSubjectCategoryDataUpdater,
    firestore,
  });

  return { data: { localeSubject } };
};

export default updateLocaleSubjectCategory;
