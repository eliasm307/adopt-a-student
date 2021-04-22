import {
  GenericSubjectCategoryData, isGenericSubjectCategoryData, UpdateSubjectCategoryRequestBody,
  UpdateSubjectCategoryResponseBody,
} from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import genericSubjectCategoryDataUpdater from '../../../utils/data-updaters/genericSubjectCategoryDataUpdater';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import updateDocumentData from '../../../utils/firebase/updateDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

const updateSubjectCategory: FirebaseCallableFunctionHandler<
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

  const { id, locale, updates: localeCategoryupdates } = body;

  const genericCategoryupdates: Partial<GenericSubjectCategoryData> = {
    locales: { [locale]: localeCategoryupdates },
  } as Partial<GenericSubjectCategoryData>;

  /*
  const genericSubjectCategory = await getDocumentData({
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
    firestoreAdmin,
    id,
  });
  */

  // update just the locale subject category of the generic
  const genericSubjectCategory = await updateDocumentData({
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    id,
    updates: genericCategoryupdates,
    dataPredicate: isGenericSubjectCategoryData,
    dataUpdater: genericSubjectCategoryDataUpdater,
    firestoreAdmin,
  });

  const subjectCategory = genericSubjectCategory.locales[locale];

  if (!subjectCategory)
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue updating the locale subject category"
    );

  return { result: subjectCategory } as UpdateSubjectCategoryResponseBody;
};

export default updateSubjectCategory;
