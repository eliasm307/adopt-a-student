import { FirebaseCallableFunctionHandler } from '../../types';

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should remove subject to user and user to subject
export type ApiUnlinkTutorAndLocaleSubject = ;

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should add subject to user and user to subject
export type ApiLinkSubjectAndSubjectCategory = ;

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should remove subject to user and user to subject
export type ApiUnlinkSubjectAndSubjectCategory = FirebaseCallableFunctionHandler<
  UnlinkSubjectAndSubjectCategoryRequestBody,
  UnlinkSubjectAndSubjectCategoryResponseBody
>;

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should add subject to user and user to subject
export type ApiLinkStudentAndTutor = FirebaseCallableFunctionHandler<
  LinkStudentAndTutorRequestBody,
  LinkStudentAndTutorResponseBody
>;

export type ApiUnlinkStudentAndTutor = FirebaseCallableFunctionHandler<
  UnlinkStudentAndTutorRequestBody,
  UnlinkStudentAndTutorResponseBody
>;

export type ApiLinkSubjects = FirebaseCallableFunctionHandler<
  LinkSubjectsRequestBody,
  LinkSubjectsResponseBody
>;

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should add subject to user and user to subject
export type ApiLinkGenericSubjects = FirebaseCallableFunctionHandler<
  LinkSubjectsRequestBody,
  LinkSubjectsResponseBody
>;

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should remove subject to user and user to subject
export type ApiUnlinkGenericSubjects = FirebaseCallableFunctionHandler<
  UnlinkSubjectsRequestBody,
  UnlinkSubjectsResponseBody
>;
