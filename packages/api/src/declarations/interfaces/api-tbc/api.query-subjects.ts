import { GenericSubjectData, LocaleCode, LocaleSubjectData } from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../../types';

/** Get subjects by category */
export type ApiGetSubjectsByCategory = FirebaseCallableFunctionHandler<
  {
    locale: LocaleCode;
    subjectCategoryId: string;
  },
  {
    data: {
      localeSubject: LocaleSubjectData;
      genericSubject: GenericSubjectData;
    }[];
  }
>;
