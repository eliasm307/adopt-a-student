import {
  GetSubjectCategoryRequestBody, GetSubjectCategoryResponseBody, isGenericSubjectCategoryData,
} from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import getCollectionData from '../../../utils/firebase/getCollectionData';
import getDocumentData from '../../../utils/firebase/getDocumentData';
import verifyRequest from '../../../utils/verifyRequest';

const getSubjectCategory: FirebaseCallableFunctionHandler<
  GetSubjectCategoryRequestBody,
  GetSubjectCategoryResponseBody
> = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.locale || !data.id)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get subject because provided data is incomplete"
    );

  const { id, locale } = data;

  const genericCategory = await getDocumentData({
    firestoreAdmin,
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    id,
    dataPredicate: isGenericSubjectCategoryData,
  });

  // ? should fallback be en?
  const localeSubjectCategory = genericCategory.locales[locale]; // || genericCategory.locales.en;

  if (!localeSubjectCategory) {
    console.warn(
      __filename,
      "Locale subject category not defined and en fallback not defined also",
      {
        locale,
        genericCategory,
      }
    );
    throw new functionsHttps.HttpsError(
      "not-found",
      `Subject does not have initial details for locale ${String(
        locale
      )}, set these using the updateSubjectCategory function`
    );
  }

  /*
  const subjectCategoriesForLocale = genericSubjectCategories
    // get locale subjects from generic subject, default to en if not defined
    .map((genericCategory) => {
      const localeSubjectCategory =
        genericCategory.locales[locale] || genericCategory.locales.en;

      if (!localeSubjectCategory)
        console.warn(
          __filename,
          "Locale subject category not defined and en fallback not defined also",
          {
            locale,
            genericCategory,
          }
        );

      return localeSubjectCategory;
    })
    // filter out any falsy locale subjects
    .filter((localeSubjectCategory) => !!localeSubjectCategory)
    // type assertion to make ts happy
    .map(
      (localeSubjectCategory) =>
        localeSubjectCategory as LocaleSubjectCategoryData
    );
    */

  return {
    subjectCategory: localeSubjectCategory,
  } as GetSubjectCategoryResponseBody;
};

export default getSubjectCategory;
