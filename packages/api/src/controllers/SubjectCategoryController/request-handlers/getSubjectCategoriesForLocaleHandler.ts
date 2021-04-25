import {
  GetSubjectCategoriesForLocaleRequestBody, GetSubjectCategoriesForLocaleResponseBody,
  isGenericSubjectCategoryData, LocaleSubjectCategoryData,
} from '@adopt-a-student/common';

import { SUBJECT_CATEGORY_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import getCollectionData from '../../../utils/firebase/getCollectionData';
import verifyRequest from '../../../utils/verifyRequest';

const getSubjectCategoriesForLocaleHandler: InternalHandler<
  GetSubjectCategoriesForLocaleRequestBody,
  GetSubjectCategoriesForLocaleResponseBody
> = async (props) => {
  const { locale } = props;

  const genericSubjectCategories = await getCollectionData({
    firestoreAdmin,
    collectionPath: SUBJECT_CATEGORY_COLLECTION_NAME,
    dataPredicate: isGenericSubjectCategoryData,
  });

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

  return {
    subjectCategories: subjectCategoriesForLocale,
  } as GetSubjectCategoriesForLocaleResponseBody;
};

export default getSubjectCategoriesForLocaleHandler;
