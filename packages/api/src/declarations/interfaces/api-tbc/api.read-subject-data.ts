import {
  GenericSubjectData, LocaleCode, LocaleSubjectCategoryData, LocaleSubjectData,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../../types';

/** Get subject by id */
export type ApiGetSubjectData = FirebaseCallableFunctionHandler<
  {
    localeSubjectId: string;
  },
  {
    localeSubject: LocaleSubjectData;
    genericSubject: GenericSubjectData;
  }
>;

/** Get all subject categories by locale */
export type ApiGetSubjectsCategories = FirebaseCallableFunctionHandler<
  {
    locale: LocaleCode;
  },
  { data: LocaleSubjectCategoryData[] }
>;
