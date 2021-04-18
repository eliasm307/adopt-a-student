import {
  CategoryId, LocaleSubjectId, StudentId, SubjectId, TutorId, UserSubjectData,
} from '@adopt-a-student/common';

import { BasicResponseData } from '../';
import { FirebaseCallableFunctionHandler } from '../../types';

export interface LinkStudentAndSubjectRequestBody {
  data: UserSubjectData;
}

export interface LinkStudentAndSubjectResponseBody extends BasicResponseData {}

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should add subject to user and user to subject

export type ApiLinkStudentAndLocaleSubject = FirebaseCallableFunctionHandler<
  LinkStudentAndSubjectRequestBody,
  LinkStudentAndSubjectResponseBody
>;

export interface LinkTutorAndSubjectRequestBody {
  data: UserSubjectData;
}

export interface LinkTutorAndSubjectResponseBody extends BasicResponseData {}

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should add subject to user and user to subject
export type ApiLinkTutorAndLocaleSubject = FirebaseCallableFunctionHandler<
  LinkTutorAndSubjectRequestBody,
  LinkTutorAndSubjectResponseBody
>;

export interface UnlinkStudentAndSubjectRequestBody {
  id: LocaleSubjectId;
}

export interface UnlinkStudentAndSubjectResponseBody
  extends BasicResponseData {}
// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should remove subject to user and user to subject
export type ApiUnlinkStudentAndLocaleSubject = FirebaseCallableFunctionHandler<
  UnlinkStudentAndSubjectRequestBody,
  UnlinkStudentAndSubjectResponseBody
>;
export interface UnlinkTutorAndSubjectRequestBody {
  id: LocaleSubjectId;
}

export interface UnlinkTutorAndSubjectResponseBody extends BasicResponseData {}

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should remove subject to user and user to subject
export type ApiUnlinkTutorAndLocaleSubject = FirebaseCallableFunctionHandler<
  UnlinkTutorAndSubjectRequestBody,
  UnlinkTutorAndSubjectResponseBody
>;

export interface LinkSubjectAndSubjectCategoryRequestBody {
  categoryId: CategoryId;
  subjectId: SubjectId;
}

export interface LinkSubjectAndSubjectCategoryResponseBody
  extends BasicResponseData {}

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should add subject to user and user to subject
export type ApiLinkSubjectAndSubjectCategory = FirebaseCallableFunctionHandler<
  LinkSubjectAndSubjectCategoryRequestBody,
  LinkSubjectAndSubjectCategoryResponseBody
>;

export interface UnlinkSubjectAndSubjectCategoryRequestBody {
  categoryId: CategoryId;
  subjectId: SubjectId;
}

export interface UnlinkSubjectAndSubjectCategoryResponseBody
  extends BasicResponseData {}

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should remove subject to user and user to subject
export type ApiUnlinkSubjectAndSubjectCategory = FirebaseCallableFunctionHandler<
  UnlinkSubjectAndSubjectCategoryRequestBody,
  UnlinkSubjectAndSubjectCategoryResponseBody
>;

export interface LinkStudentAndTutorRequestBody {
  studentId: StudentId;
  tutorId: TutorId;
}

export interface LinkStudentAndTutorResponseBody extends BasicResponseData {}

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should add subject to user and user to subject
export type ApiLinkStudentAndTutor = FirebaseCallableFunctionHandler<
  LinkStudentAndTutorRequestBody,
  LinkStudentAndTutorResponseBody
>;

export interface UnlinkStudentAndTutorRequestBody {
  studentId: StudentId;
  tutorId: TutorId;
}

export interface UnlinkStudentAndTutorResponseBody extends BasicResponseData {}

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should remove subject to user and user to subject
export type ApiUnlinkStudentAndTutor = FirebaseCallableFunctionHandler<
  UnlinkStudentAndTutorRequestBody,
  UnlinkStudentAndTutorResponseBody
>;

export type ApiLinkSubjects = FirebaseCallableFunctionHandler<
  LinkSubjectsRequestBody,
  LinkSubjectsResponseBody
>;

export interface LinkSubjectsRequestBody {
  subject1Id: string;
  subject2Id: string;
}

export interface LinkSubjectsResponseBody extends BasicResponseData {}

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should add subject to user and user to subject
export type ApiLinkGenericSubjects = FirebaseCallableFunctionHandler<
  LinkSubjectsRequestBody,
  LinkSubjectsResponseBody
>;

export interface UnlinkSubjectsRequestBody {
  subject1Id: string;
  subject2Id: string;
}

export interface UnlinkSubjectsResponseBody extends BasicResponseData {}

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should remove subject to user and user to subject
export type ApiUnlinkGenericSubjects = FirebaseCallableFunctionHandler<
  UnlinkSubjectsRequestBody,
  UnlinkSubjectsResponseBody
>;
