import { BasicResponseData } from '../';
import { FirebaseCallableFunctionHandler } from '../../types';

export type ApiLinkStudentAndLocaleSubject = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should add subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;
export type ApiLinkTutorAndLocaleSubject = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should add subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;
export type ApiUnlinkStudentAndLocaleSubject = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should remove subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;
export type ApiUnlinkTutorAndLocaleSubject = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should remove subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;

export type ApiLinkGenericSubjectAndSubjectCategory = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should add subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;
export type ApiUnlinkGenericSubjectAndSubjectCategory = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should remove subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;

export type ApiLinkStudentAndTutor = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should add subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;
export type ApiUnlinkStudentAndTutor = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    // todo should remove subject to user and user to subject
    data?: { localeSubjectId: string };
  },
  BasicResponseData
>;
