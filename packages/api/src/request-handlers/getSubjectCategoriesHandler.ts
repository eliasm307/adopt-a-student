import { LocaleSubjectCategoryData } from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../constants';
import { ApiGetSubjectCategoriesHandler } from '../declarations/interfaces';
import { firestore, functionsHttps } from '../utils/firebase/firebase-admin';
import getCollectionData from '../utils/firebase/getCollectionData';
import isGenericSubjectCategoryData from '../utils/type-predicates/isGenericSubjectCategory';
import verifyRequest from '../utils/verifyRequest';

const getSubjectCategoriesHandler: ApiGetSubjectCategoriesHandler = async (
  data,
  context
) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.locale)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get subjects because provided data is missing subject id"
    );

  const locale = data.locale;

  const genericSubjectCategories = await getCollectionData({
    firestore,
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
  });

  const localeSubjectCategories = genericSubjectCategories
    // get locale subjects from generic subject, default to en if not defined
    .map((genericCategory) => {
      const localeSubjectCategory =
        genericCategory.localeSubjectCategories[locale] ||
        genericCategory.localeSubjectCategories.en;

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
    data: { localeSubjectCategories },
  };
};

export default getSubjectCategoriesHandler;
