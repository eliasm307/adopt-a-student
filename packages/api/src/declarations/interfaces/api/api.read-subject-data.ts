import { GenericSubjectData, LocaleSubjectData } from '@adopt-a-student/common';

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
