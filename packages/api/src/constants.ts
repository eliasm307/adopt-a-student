export const CALLABLE_FUNCTION_NAMES = [
  // "test",
  // "writeTest",

  // subject categories
  "getSubjectCategories",

  // subjects
  "getSubject",
  "getSubjectsByCategory",
  "createLocaleSubject",
  "updateLocaleSubject",
  "createGenericSubject",
  // "updateGenericSubject", // this only has relationship data, so no direct user updating

  // subject categories
  "createSubjectCategory",
  "updateLocaleSubjectCategory",

  // tutors
  "createTutor",
  "updateTutor",
  "getPrivateTutorData",
  "getPublicTutorData",
  "getTutorsBySubjects",

  // students
  "createStudent",
  "updateStudent",
  "getPrivateStudentData",
  "getPublicStudentData",
  "getStudentsBySubjects",

  // relationships
  "linkStudentAndLocaleSubject",
  "unlinkStudentAndLocaleSubject",

  "linkTutorAndLocaleSubject",
  "unlinkTutorAndLocaleSubject",

  "linkGenericSubjectAndSubjectCategory",
  "unlinkGenericSubjectAndSubjectCategory",

  "linkStudentAndTutor",
  "unlinkStudentAndTutor",

  "linkGenericSubjects",
  "unlinkGenericSubjects",
] as const;
export enum CallableName {
  // "test",
  // "writeTest",

  // subject categories
  getSubjectCategories = "getSubjectCategories",

  // subjects
  getSubject = "getSubject",
  getSubjectsByCategory = "getSubjectsByCategory",
  createLocaleSubject = "createLocaleSubject",
  updateLocaleSubject = "updateLocaleSubject",
  createGenericSubjectX = "createGenericSubject",
  // "updateGenericSubject", // this only has relationship data, so no direct user updating

  // subject categories
  createSubjectCategory = "createSubjectCategory",
  updateLocaleSubjectCategory = "updateLocaleSubjectCategory",

  // tutors
  createTutor = "createTutor",
  updateTutor = "updateTutor",
  getPrivateTutorData = "getPrivateTutorData",
  getPublicTutorData = "getPublicTutorData",
  getTutorsBySubjects = "getTutorsBySubjects",

  // students
  createStudent = "createStudent",
  updateStudent = "updateStudent",
  getPrivateStudentData = "getPrivateStudentData",
  getPublicStudentData = "getPublicStudentData",
  getStudentsBySubjects = "getStudentsBySubjects",

  // relationships
  linkStudentAndLocaleSubject = "linkStudentAndLocaleSubject",
  unlinkStudentAndLocaleSubject = "unlinkStudentAndLocaleSubject",

  linkTutorAndLocaleSubject = "linkTutorAndLocaleSubject",
  unlinkTutorAndLocaleSubject = "unlinkTutorAndLocaleSubject",

  linkGenericSubjectAndSubjectCategory = "linkGenericSubjectAndSubjectCategory",
  unlinkGenericSubjectAndSubjectCategory = "unlinkGenericSubjectAndSubjectCategory",

  linkStudentAndTutor = "linkStudentAndTutor",
  unlinkStudentAndTutor = "unlinkStudentAndTutor",

  linkGenericSubjects = "linkGenericSubjects",
  unlinkGenericSubjects = "unlinkGenericSubjects",
}
export const GENERIC_SUBJECT_COLLECTION_NAME = "generic-subjects";
export const LOCALE_SUBJECT_COLLECTION_NAME = "locale-subjects";
export const SUBJECT_CATEGORY_COLLECTION_NAME = "subject-categories";
export const STUDENT_COLLECTION_NAME = "students";
export const TUTOR_COLLECTION_NAME = "tutors";
