import {
  isGenericSubjectCategoryData, LocaleCode, LocaleSubjectCategoryData,
} from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import getCollectionData from '../../../utils/firebase/getCollectionData';
import verifyRequest from '../../../utils/verifyRequest';

export interface GetSubjectCategoryRequestBody {
  locale: LocaleCode;
}
export interface GetSubjectCategoryResponseBody {
  subjectCategories: LocaleSubjectCategoryData[];
}
const getSubjectCategories: FirebaseCallableFunctionHandler<
  GetSubjectCategoryRequestBody,
  GetSubjectCategoryResponseBody
> = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.locale)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get subjects because provided data is missing subject id"
    );

  const locale = data.locale;

  const genericSubjectCategories = await getCollectionData({
    firestoreAdmin,
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
  });

  const subjectCategories = genericSubjectCategories
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
    .filter((localeSubjectCategory) => localeSubjectCategory)
    // type assertion to make ts happy
    .map(
      (localeSubjectCategory) =>
        localeSubjectCategory as LocaleSubjectCategoryData
    );

  return {
    subjectCategories,
  } as GetSubjectCategoryResponseBody;
};

export default getSubjectCategories;
