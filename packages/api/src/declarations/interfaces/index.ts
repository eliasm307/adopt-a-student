/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable spaced-comment */
/*
/// <reference path="./api.query-subjects.ts" />
/// <reference path="./api.write-user-data.ts" />
/// <reference path="./api.query-subjects.ts" />
/// <reference path="./api.query-subjects.ts" />
*/

import {
  GenericSubjectCategoryData as GenericSubjectCategoryData, GenericSubjectData, LocaleSubjectData,
  PrivateStudentData, PrivateTutorData,
} from '@adopt-a-student/common';

// export namespace API {
/** Get all tutors? // ! no */
/** Get all students? // ! no */
/** Contact user // ? tbc */
// }

/** Represents firestore top level collections */
interface FirestoreSchema {
  genericSubjects: GenericSubjectData[];
  localeSubjects: LocaleSubjectData[];
  students: PrivateStudentData[];
  subjectCategories: GenericSubjectCategoryData[];
  tutors: PrivateTutorData[];
}

export interface BasicResponseData {
  message?: string;
  success: boolean;
}

export * from "./api/api.query-subjects";
export * from "./api/api.quey-users";
export * from "./api/api.read-subject-data";
export * from "./api/api.read-user-data";
export * from "./api-tbc/api.write-relationships";
export * from "./api-tbc/api.write-subject-data";
export * from "./api/api.write-user-data";
export * from "./api-tbc/api.write-subject-category-data";
export * from "./api/api.read-subject-category-data";

export type FirestoreAdmin = FirebaseFirestore.Firestore;
