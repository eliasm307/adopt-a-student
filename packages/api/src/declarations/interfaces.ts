import {
  GenericSubjectData, LocaleCode, LocaleSubjectCategoryData, LocaleSubjectData, PrivateStudentData,
  PrivateTutorData, PublicStudentData, PublicTutorData,
} from '../../common';
import { FirebaseCallableFunctionHandler } from './types';

export namespace API {
  /** Get students by subjects, save this in subject */
  export type getStudentsBySubjectsHandler = FirebaseCallableFunctionHandler<
    {
      localeSubjectIds: string[];
    },
    // returns
    { data: PublicStudentData[] }
  >;
  /** Get tutors by subjects, save this in subject */
  export type getTutorsBySubjectsHandler = FirebaseCallableFunctionHandler<
    {
      localeSubjectIds: string[];
    },
    { data: PublicTutorData[] }
  >;
  /** Get student profile by uid */
  export type getStudentProfile = FirebaseCallableFunctionHandler<
    undefined,
    // todo needs to verify a user has access to this data
    { data: PrivateStudentData }
  >;
  /** Get tutor profile by uid */
  export type getTutorProfile = FirebaseCallableFunctionHandler<
    undefined,
    // todo needs to verify a user has access to this data
    { data: PrivateTutorData }
  >;
  /** Get subject by id */
  export type getSubjectProfile = FirebaseCallableFunctionHandler<
    {
      localeSubjectId: string;
    },
    {
      localeSubject: LocaleSubjectData;
      genericSubject: GenericSubjectData;
    }
  >;
  /** Get subjects by category */
  export type getSubjectsByCategory = FirebaseCallableFunctionHandler<
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
  /** Get all subject categories by locale */
  export type getSubjectsCategories = FirebaseCallableFunctionHandler<
    {
      locale: LocaleCode;
    },
    { data: LocaleSubjectCategoryData[] }
  >;
  /** Post update to student profile */
  export type setStudentProfile = FirebaseCallableFunctionHandler<
    {
      // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
      // todo needs to verify a user has access to this data
      data?: Partial<PrivateStudentData>;
    },
    BasicResponseData
  >;
  /** Post update to tutor profile */
  export type updateTutorHandler = FirebaseCallableFunctionHandler<
    {
      // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
      // todo needs to verify a user has access to this data
      data?: Partial<PrivateTutorData>;
    },
    BasicResponseData & { data: PrivateTutorData }
  >;
  /** Create tutor profile */
  export type createTutorHandler = FirebaseCallableFunctionHandler<
    {
      data?: PrivateTutorData;
    },
    BasicResponseData & { data: PrivateTutorData }
  >;
  /** Post update for locale subject */
  export type setLocaleSubjectHandler = FirebaseCallableFunctionHandler<
    {
      data?: Partial<LocaleSubjectData>;
    },
    BasicResponseData
  >;

  /** Post update for generic subject */
  export type setGenericSubject = FirebaseCallableFunctionHandler<
    {
      // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
      // todo needs to verify a user has access to this data
      data?: Partial<GenericSubjectData>;
    },
    BasicResponseData
  >;

  /** Post update for locale subject category */
  export type setSubjectCatgory = FirebaseCallableFunctionHandler<
    {
      // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
      // todo needs to verify a user has access to this data
      data?: Partial<LocaleSubjectCategoryData>;
    },
    BasicResponseData
  >;
  export type addStudentToLocaleSubject = FirebaseCallableFunctionHandler<
    {
      // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
      // todo needs to verify a user has access to this data
      // todo should add subject to user and user to subject
      data?: { localeSubjectId: string };
    },
    BasicResponseData
  >;
  export type addTutorToLocaleSubject = FirebaseCallableFunctionHandler<
    {
      // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
      // todo needs to verify a user has access to this data
      // todo should add subject to user and user to subject
      data?: { localeSubjectId: string };
    },
    BasicResponseData
  >;
  export type removeStudentToLocaleSubject = FirebaseCallableFunctionHandler<
    {
      // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
      // todo needs to verify a user has access to this data
      // todo should remove subject to user and user to subject
      data?: { localeSubjectId: string };
    },
    BasicResponseData
  >;
  export type removeTutorToLocaleSubject = FirebaseCallableFunctionHandler<
    {
      // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
      // todo needs to verify a user has access to this data
      // todo should remove subject to user and user to subject
      data?: { localeSubjectId: string };
    },
    BasicResponseData
  >;

  /** Get all tutors? // ! no */
  /** Get all students? // ! no */
  /** Contact user // ? tbc */
}
interface BasicResponseData {
  message?: string;
  success: boolean;
}
