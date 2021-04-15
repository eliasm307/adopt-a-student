/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable spaced-comment */
/*
/// <reference path="./api.query-subjects.ts" />
/// <reference path="./api.write-user-data.ts" />
/// <reference path="./api.query-subjects.ts" />
/// <reference path="./api.query-subjects.ts" />
*/

// export namespace API {
/** Get all tutors? // ! no */
/** Get all students? // ! no */
/** Contact user // ? tbc */
// }

export interface BasicResponseData {
  message?: string;
  success: boolean;
}

export * from "./api/api.query-subjects";
export * from "./api/api.quey-users";
export * from "./api-tbc/api.read-subject-data";
export * from "./api-tbc/api.read-user-data";
export * from "./api-tbc/api.write-relationships";
export * from "./api-tbc/api.write-subject-data";
export * from "./api-tbc/api.write-user-data";

export type FirestoreAdmin = FirebaseFirestore.Firestore;
