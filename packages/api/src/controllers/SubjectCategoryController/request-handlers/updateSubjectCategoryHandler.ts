import {
  GenericSubjectCategoryData, isGenericSubjectCategoryData, UpdateSubjectCategoryRequestBody,
  UpdateSubjectCategoryResponseBody,
} from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import genericSubjectCategoryDataUpdater from '../../../utils/data-updaters/genericSubjectCategoryDataUpdater';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

/** This allows internal subject category locale details to be updated */
const updateSubjectCategory: InternalHandler<
  UpdateSubjectCategoryRequestBody,
  UpdateSubjectCategoryResponseBody
> = async (props) => {
  const { id, locale, updates: localeCategoryUpdates } = props;

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
