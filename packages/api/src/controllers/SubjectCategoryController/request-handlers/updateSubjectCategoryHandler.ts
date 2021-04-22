import {
  GenericSubjectCategoryData, isGenericSubjectCategoryData, UpdateSubjectCategoryRequestBody,
  UpdateSubjectCategoryResponseBody,
} from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../../../constants';
import genericSubjectCategoryDataUpdater from '../../../utils/data-updaters/genericSubjectCategoryDataUpdater';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

/** This allows internal subject category locale details to be updated */
const updateSubjectCategory: InternalHandler<
  UpdateSubjectCategoryRequestBody,
  UpdateSubjectCategoryResponseBody
> = async (body, context) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (
    !body ||
    !body.updates ||
    typeof body.updates !== "object" ||
    !Object.keys(body.updates).length ||
    !body.id ||
    !body.locale
  )
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update document because provided data is not valid"
    );

  const { id, locale, updates: localeCategoryUpdates } = body;

  const genericCategoryUpdates: Partial<GenericSubjectCategoryData> = {
    locales: { [locale]: localeCategoryUpdates },
  } as Partial<GenericSubjectCategoryData>;

  // update just the locale subject category of the generic
  const genericSubjectCategory = await updateDocumentData({
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    id,
    updates: genericCategoryUpdates,
    dataPredicate: isGenericSubjectCategoryData,
    dataUpdater: genericSubjectCategoryDataUpdater,
    firestoreAdmin,
  });

  const result = genericSubjectCategory.locales[locale];

  if (!result)
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue updating the locale subject category"
    );

  return { result } as UpdateSubjectCategoryResponseBody;
};

export default updateSubjectCategory;
