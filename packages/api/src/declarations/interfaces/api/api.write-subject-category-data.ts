import { LocaleSubjectCategoryData } from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../../types';

export type ApiUpdateLocaleSubjectCategoryHandler = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // ? should this make sure an en localeCategory is defined to make sure there is a default fallback for other languages when not defined
    /** Generic subject id */
  },
  {
    data: {
      localeSubjectCategory: LocaleSubjectCategoryData;
    };
  }
>;
