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
] as const;

export const GENERIC_SUBJECT_COLLECTION_NAME = "generic-subjects";
export const LOCALE_SUBJECT_COLLECTION_NAME = "locale-subjects";
export const SUBJECT_CATEGORY_COLLECTION_NAME = "subject-categories";
export const STUDENT_COLLECTION_NAME = "students";
export const TUTOR_COLLECTION_NAME = "tutors";
