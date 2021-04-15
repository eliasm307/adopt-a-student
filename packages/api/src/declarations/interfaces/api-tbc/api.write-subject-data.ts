import {
  GenericSubjectData, LocaleSubjectCategoryData, LocaleSubjectData,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../types';
import { BasicResponseData } from './';

/** Post update for locale subject */
export type ApiSetLocaleSubjectHandler = FirebaseCallableFunctionHandler<
  {
    data?: Partial<LocaleSubjectData>;
  },
  BasicResponseData
>;

/** Post update for generic subject */
export type ApiSetGenericSubject = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    data?: Partial<GenericSubjectData>;
  },
  BasicResponseData
>;

/** Post update for locale subject category */
export type ApiSetSubjectCatgory = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    data?: Partial<LocaleSubjectCategoryData>;
  },
  BasicResponseData
>;
