import {
  GenericSubjectCategoryData, GenericSubjectData, LocaleSubjectCategoryData, LocaleSubjectData,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../../types';

/** Post update for locale subject */
export type ApiUpdateLocaleSubjectHandler = FirebaseCallableFunctionHandler<
  {
    /** Locale subject id to modify */
    id: string;
    data?: Partial<Omit<LocaleSubjectData, "id">>;
  },
  {
    data: {
      localeSubject: LocaleSubjectData;
    };
  }
>;

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

export type ApiCreateSubjectCatgoryHandler = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // ? should this make sure an en localeCategory is defined to make sure there is a default fallback for other languages when not defined
    data?: Partial<Omit<GenericSubjectCategoryData, "id">>;
  },
  {
    data: {
      genericSubjectCategory: GenericSubjectCategoryData;
    };
  }
>;

export type ApiUpdateLocaleSubjectCategoryHandler = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // ? should this make sure an en localeCategory is defined to make sure there is a default fallback for other languages when not defined
    /** Generic subject id */
    id: string;
    data?: Partial<Omit<LocaleSubjectCategoryData, "id">>;
  },
  {
    data: {
      localeSubjectCategory: LocaleSubjectCategoryData;
    };
  }
>;
