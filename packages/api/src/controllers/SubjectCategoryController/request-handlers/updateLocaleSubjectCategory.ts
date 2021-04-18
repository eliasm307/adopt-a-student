import { GenericSubjectCategoryData, isGenericSubjectCategoryData } from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../../../constants';
import { ApiUpdateLocaleSubjectCategoryHandler } from '../../../declarations/interfaces';
import genericSubjectCategoryDataUpdater from '../../../utils/data-updaters/genericSubjectCategoryDataUpdater';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

const updateLocaleSubjectCategory: ApiUpdateLocaleSubjectCategoryHandler = async (
  body,
  context
) => {
  const { uid } = verifyRequest(body, context);

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
    locales: { [locale]: localeCategoryEdits },
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
  const genericSubjectCategory = await updateDocumentData({
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    id,
    edits: genericCategoryEdits,
    dataPredicate: isGenericSubjectCategoryData,
    dataUpdater: genericSubjectCategoryDataUpdater,
    firestore: firestoreAdmin,
  });

  const localeSubjectCategory = genericSubjectCategory.locales[locale];

  if (!localeSubjectCategory)
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue updating the locale subject category"
    );

  return { data: { localeSubjectCategory } };
};

export default updateLocaleSubjectCategory;
