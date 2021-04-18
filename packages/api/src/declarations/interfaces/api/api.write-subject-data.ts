import { GenericSubjectData, LocaleSubjectData } from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../../types';

export type ApiCreateLocaleSubjectHandler = FirebaseCallableFunctionHandler<
  {
    data?: Omit<LocaleSubjectData, "id">;
  },
  {
    data: {
      localeSubject: LocaleSubjectData;
    };
  }
>;

/*
 // No data to edit directly on Generic Subject
export type ApiUpdateGenericSubjectHandler = FirebaseCallableFunctionHandler<
  {
    id: string;
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    data?: Partial<Omit<GenericSubjectData, "id">>;
  },
  {
    data: {
      genericSubject: GenericSubjectData;
    };
  }
>;
*/

export type ApiCreateGenericSubjectHandler = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    data?: Omit<GenericSubjectData, "id">;
  },
  {
    data: {
      genericSubject: GenericSubjectData;
    };
  }
>;
