import { LocaleCode, LocaleSubjectCategoryData } from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../../types';

/** Get all subject categories by locale */
export type ApiGetSubjectCategoriesHandler = FirebaseCallableFunctionHandler<
  {
    locale: LocaleCode;
  },
  { data: { localeSubjectCategories: LocaleSubjectCategoryData[] } } // todo all returns should be named inside data object
>;
