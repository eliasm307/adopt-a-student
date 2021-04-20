/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable spaced-comment */
/*
/// <reference path="./api.query-subjects.ts" />
/// <reference path="./api.write-user-data.ts" />
/// <reference path="./api.query-subjects.ts" />
/// <reference path="./api.query-subjects.ts" />
*/

import {
  GenericSubjectCategoryData as GenericSubjectCategoryData, GenericSubjectData, LocaleCode,
  LocaleSubjectData, PrivateStudentData, PrivateTutorData,
} from '@adopt-a-student/common';

// export namespace API {
/** Get all tutors? // ! no */
/** Get all students? // ! no */
/** Contact user // ? tbc */
// }

/** Represents firestore top level collections */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FirestoreSchema {
  /** Generic subjects, each with a locale subject sub collection */
  genericSubjects: (GenericSubjectData & {
    localeSubjects: { [key in LocaleCode]: LocaleSubjectData };
  })[];
  /** // todo move to sub collecitons inside generic subjects */
  localeSubjects: LocaleSubjectData[];
  // ? would it be better if students and teachers were in one collection, then they have props to describe their roles and data associated with their role, ie a user can be both tutor and student. For the current setup, if a user wanted to be both then those profiles are unrelated, is this a good thing? what, if any data needs to be shared?
  students: PrivateStudentData[];
  subjectCategories: GenericSubjectCategoryData[];
  tutors: PrivateTutorData[];
}

export type FirestoreAdmin = FirebaseFirestore.Firestore;

/**
 * The interface for metadata for the API as passed to the handler.
 * Provided automatically by Firebase.
 * Duplicated from firebase for TSOA compatibility.
 */
export type FirebaseCallableFunctionContext = {
  /**
   * The result of decoding and verifying a Firebase Auth ID token.
   */
  auth?: {
    uid: string;
    token: any;
  };
  /**
   * An unverified token for a Firebase Instance ID.
   */
  instanceIdToken?: string;
  /**
   * The raw request handled by the callable.
   */
  rawRequest: any;
};
