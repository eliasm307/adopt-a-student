import { FirebaseCallableFunctionHandler } from '../types';
import { BasicResponseData } from './';

export type ApiLinkStudentToLocaleSubject = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should add subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;
export type ApiLinkTutorToLocaleSubject = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should add subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;
export type ApiUnlinkStudentFromLocaleSubject = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should remove subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;
export type ApiUnlinkTutorFromLocaleSubject = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should remove subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;
