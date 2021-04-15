import {
  GenericSubjectData, LocaleCode, LocaleSubjectCategoryData, LocaleSubjectData,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../../types';

/** Get subject by id */
export type ApiGetSubjectHandler = FirebaseCallableFunctionHandler<
  {
    localeSubjectId: string;
  },
  {
    data: {
      localeSubject: LocaleSubjectData;
      genericSubject: GenericSubjectData;
    };
  }
>;

/** Get all subject categories by locale */
export type ApiGetSubjectCategoriesHandler = FirebaseCallableFunctionHandler<
  {
    locale: LocaleCode;
  },
  { data: { subjectCategories: LocaleSubjectCategoryData[] } } // todo all returns should be named inside data object
>;
