import CallableFunctionNames from '../data/api/callableFunctionNames.json';
import {
  GenericSubjectCategoryData, GenericSubjectData, LocaleSubjectCategoryData, LocaleSubjectData,
  PrivateStudentData, PrivateTutorData, PublicStudentData, PublicTutorData, UserSubjectData,
} from './data-models';
import {
  CategoryId, Country, LocaleCode, StudentId, SubjectCategoryId, SubjectCategoryName, SubjectId,
  TutorId,
} from './types';

export { CallableFunctionNames };

export interface GetStudentsBySubjectsRequestBody {
  subjectIds: SubjectId[];
}
export interface GetStudentsBySubjectsResponseBody {
  students: PublicStudentData[];
}

export interface GetTutorsBySubjectsRequestBody {
  subjectIds: SubjectId[];
}
export interface GetTutorsBySubjectsResponseBody {
  tutors: PublicTutorData[];
}

export interface CreateTutorRequestBody {
  tutor: Omit<PrivateTutorData, "id">;
}

export interface CreateTutorResponseBody {
  tutor: PrivateTutorData;
}

export interface CreateStudentRequestBody {
  student: Omit<PrivateStudentData, "id">;
}

export interface CreateStudentResponseBody {
  student: PrivateStudentData;
}

export interface UpdateTutorRequestBody {
  updates: Partial<Omit<PrivateTutorData, "id">>;
}

export interface UpdateTutorResponseBody {
  result: PrivateTutorData;
}

export interface UpdateStudentRequestBody {
  updates: Partial<Omit<PrivateStudentData, "id">>;
}

export interface UpdateStudentResponseBody {
  result: PrivateStudentData;
}
export interface GetTutorRequestBody {
  id: TutorId;
}

export interface GetTutorResponseBody {
  tutor: PrivateTutorData | PublicTutorData;
}

export interface GetStudentRequestBody {
  id: StudentId;
}

export interface GetStudentResponseBody {
  student: PrivateStudentData | PublicStudentData;
}

export interface GetSubjectsByCategoryRequestBody {
  categoryId: SubjectCategoryId;
  country: Country;
  locale: LocaleCode;
}

export interface SubjectOverview {
  relatedCategories: CategoryId[];
  relatedSubjects: SubjectId[];
  subject: LocaleSubjectData;
}

export interface SubjectCategoryOverview {
  category: LocaleSubjectCategoryData;
  relatedSubjects: SubjectId[];
}

export interface GetSubjectsByCategoryResponseBody {
  results: SubjectOverview[];
}
export interface UpdateLocaleSubjectRequestBody {
  country: Country;
  id: SubjectId;
  locale: LocaleCode;
  updates: Partial<Omit<LocaleSubjectData, "id">>;
}
export interface UpdateLocaleSubjectResponseBody {
  result: LocaleSubjectData;
}

export interface CreateGenericSubjectRequestBody {
  /** initial localeSubjectData */
  data: Omit<LocaleSubjectData, "id">;
}
export interface CreateGenericSubjectResponseBody {
  genericSubject: GenericSubjectData;
  localeSubject: LocaleSubjectData;
}

export interface CreateLocaleSubjectRequestBody {
  data: Omit<LocaleSubjectData, "id">;
  genericSubjectId: SubjectId;
}

export interface CreateLocaleSubjectResponseBody {
  subject: LocaleSubjectData;
}
export interface GetSubjectRequestBody {
  country: Country;
  id: SubjectId;
  locale: LocaleCode;
}
export interface GetSubjectResponseBody {
  localeSubject: LocaleSubjectData;
  relatedCategories: CategoryId[];
  relatedSubjects: SubjectId[];
}
export interface CreateSubjectCategoryRequestBody {
  // data: Omit<LocaleSubjectCategoryData, "id" | "locale">;
  locale: LocaleCode;
  name: SubjectCategoryName;
}
export interface CreateSubjectCategoryResponseBody {
  result: GenericSubjectCategoryData;
}
export interface UnlinkSubjectsRequestBody {
  subject1Id: SubjectId;
  subject2Id: SubjectId;
}

export interface UnlinkSubjectsResponseBody {
  // return nothing, as getting useful data would require queries out of the scope of what has been requested
}

export interface LinkSubjectsRequestBody {
  subject1Id: SubjectId;
  subject2Id: SubjectId;
}

export interface LinkSubjectsResponseBody {
  // return nothing, as getting useful data would require queries out of the scope of what has been requested
}

export interface UnlinkStudentAndTutorRequestBody {
  studentId: StudentId;
  tutorId: TutorId;
}

export interface UnlinkStudentAndTutorResponseBody {
  student: PublicStudentData;
  tutor: PublicTutorData;
}

export interface LinkStudentAndTutorRequestBody {
  studentId: StudentId;
  tutorId: TutorId;
}

export interface LinkStudentAndTutorResponseBody {
  student: PublicStudentData;
  tutor: PublicTutorData;
}

export interface UnlinkSubjectAndSubjectCategoryRequestBody {
  categoryId: CategoryId;
  subjectId: SubjectId;
}

export interface UnlinkSubjectAndSubjectCategoryResponseBody {
  // return nothing, as getting useful data would require queries out of the scope of what has been requested
}

export interface LinkSubjectAndSubjectCategoryRequestBody {
  categoryId: CategoryId;
  /** Locale to be returned after linking */
  locale: LocaleCode;
  subjectId: SubjectId;
}

export interface LinkSubjectAndSubjectCategoryResponseBody {
  // return nothing, as getting useful data would require queries out of the scope of what has been requested
}

export interface UnlinkTutorAndSubjectRequestBody {
  country: Country;
  id: SubjectId;
  locale: LocaleCode;
}

export interface UnlinkTutorAndSubjectResponseBody {
  subject: LocaleSubjectData;
  tutor: PublicTutorData;
}

export interface UnlinkStudentAndSubjectRequestBody {
  country: Country;
  id: SubjectId;
  locale: LocaleCode;
}

export interface UnlinkStudentAndSubjectResponseBody {
  student: PublicStudentData;
  subject: LocaleSubjectData;
}

export interface LinkTutorAndSubjectRequestBody {
  data: UserSubjectData;
}

export interface LinkTutorAndSubjectResponseBody {
  subject: LocaleSubjectData;
  // private data because the user owning the profile can make this change
  tutor: PrivateTutorData;
}

export interface LinkStudentAndSubjectRequestBody {
  data: UserSubjectData;
}

export interface LinkStudentAndSubjectResponseBody {
  student: PublicStudentData;
  subject: LocaleSubjectData;
}

/*
export interface BasicResponseData {
  message?: string;

// success: boolean;
}
*/

export interface UpdateSubjectCategoryRequestBody {
  id: SubjectCategoryId;
  locale: LocaleCode;
  updates: Partial<Omit<LocaleSubjectCategoryData, "id" | "locale">>;
}
export interface UpdateSubjectCategoryResponseBody {
  result: LocaleSubjectCategoryData;
}

export interface GetSubjectCategoryRequestBody {
  id: SubjectCategoryId;
  locale: LocaleCode;
}
export interface GetSubjectCategoryResponseBody {
  subjectCategory: LocaleSubjectCategoryData;
}

export interface GetSubjectCategoriesForLocaleRequestBody {
  locale: LocaleCode;
}
export interface GetSubjectCategoriesForLocaleResponseBody {
  subjectCategories: LocaleSubjectCategoryData[];
}
