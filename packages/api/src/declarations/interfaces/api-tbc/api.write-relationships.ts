import { FirebaseCallableFunctionHandler } from '../../types';

export type ApiLinkStudentAndLocaleSubject = FirebaseCallableFunctionHandler<{
  // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
  // todo needs to verify a user has access to this data
  // todo should add subject to user and user to subject
  studentId: string;
  localeSubjectId: string;
}>;
export type ApiLinkTutorAndLocaleSubject = FirebaseCallableFunctionHandler<{
  // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
  // todo needs to verify a user has access to this data
  // todo should add subject to user and user to subject
  tutortId: string;
  localeSubjectId: string;
}>;
export type ApiUnlinkStudentAndLocaleSubject = FirebaseCallableFunctionHandler<{
  // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
  // todo needs to verify a user has access to this data
  // todo should remove subject to user and user to subject
  studentId: string;
  localeSubjectId: string;
}>;
export type ApiUnlinkTutorAndLocaleSubject = FirebaseCallableFunctionHandler<{
  // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
  // todo needs to verify a user has access to this data
  // todo should remove subject to user and user to subject
  tutortId: string;
  localeSubjectId: string;
}>;

export type ApiLinkGenericSubjectAndSubjectCategory = FirebaseCallableFunctionHandler<{
  // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
  // todo needs to verify a user has access to this data
  // todo should add subject to user and user to subject
  genericSubjectId: string;
  subjectCategoryId: string;
}>;
export type ApiUnlinkGenericSubjectAndSubjectCategory = FirebaseCallableFunctionHandler<{
  // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
  // todo needs to verify a user has access to this data
  // todo should remove subject to user and user to subject
  genericSubjectId: string;
  subjectCategoryId: string;
}>;

export type ApiLinkStudentAndTutor = FirebaseCallableFunctionHandler<{
  // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
  // todo needs to verify a user has access to this data
  // todo should add subject to user and user to subject
  studentId: string;
  tutorId: string;
}>;
export type ApiUnlinkStudentAndTutor = FirebaseCallableFunctionHandler<{
  // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
  // todo needs to verify a user has access to this data
  // todo should remove subject to user and user to subject
  studentId: string;
  tutorId: string;
}>;
