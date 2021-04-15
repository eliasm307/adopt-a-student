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

export * from "./api.query-subjects";
export * from "./api.quey-users";
export * from "./api.read-subject-data";
export * from "./api.read-user-data";
export * from "./api.write-relationships";
export * from "./api.write-subject-data";
export * from "./api.write-user-data";
