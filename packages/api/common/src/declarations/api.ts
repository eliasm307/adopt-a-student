import {
  GenericSubjectCategoryData, GenericSubjectData, LocaleSubjectData, PrivateStudentData,
  PrivateTutorData, PublicStudentData, PublicTutorData, UserSubjectData,
} from './data-models';
import {
  CategoryId, GenericSubjectId, LocaleCode, LocaleSubjectId, StudentId, SubjectCategoryId,
  SubjectId, TutorId,
} from './types';

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
  locale: LocaleCode;
}

export interface SubjectOverview {
  relatedCategories: CategoryId[];
  relatedSubjects: GenericSubjectId[];
  subject: LocaleSubjectData;
}

export interface GetSubjectsByCategoryResponseBody {
  results: SubjectOverview[];
}
export interface UpdateLocaleSubjectRequestBody {
  /** Locale subject id to modify */
  id: LocaleSubjectId;
  updates: Partial<Omit<LocaleSubjectData, "id">>;
}
export interface UpdateLocaleSubjectResponseBody {
  result: LocaleSubjectData;
}

export interface CreateGenericSubjectRequestBody {
  data?: Omit<GenericSubjectData, "id">;
}
export interface CreateGenericSubjectResponseBody {
  subject: GenericSubjectData;
}
export interface CreateLocaleSubjectRequestBody {
  data: Omit<LocaleSubjectData, "id">;
  genericSubjectId: string;
}

export interface CreateLocaleSubjectResponseBody {
  subject: LocaleSubjectData;
}
export interface GetSubjectRequestBody {
  id: LocaleSubjectId;
}
export interface GetSubjectResponseBody {
  localeSubject: LocaleSubjectData;
  relatedCategories: CategoryId[];
  relatedSubjects: SubjectId[];
}
export interface CreateSubjectCategoryRequestBody {
  updates: Partial<Omit<GenericSubjectCategoryData, "id">>;
}
export interface CreateSubjectCategoryResponseBody {
  result: GenericSubjectCategoryData;
}
export interface UnlinkSubjectsRequestBody {
  subject1Id: string;
  subject2Id: string;
}

export interface UnlinkSubjectsResponseBody extends BasicResponseData {}

export interface LinkSubjectsRequestBody {
  subject1Id: string;
  subject2Id: string;
}

export interface LinkSubjectsResponseBody extends BasicResponseData {}
export interface UnlinkStudentAndTutorRequestBody {
  studentId: StudentId;
  tutorId: TutorId;
}

export interface UnlinkStudentAndTutorResponseBody extends BasicResponseData {}
export interface LinkStudentAndTutorRequestBody {
  studentId: StudentId;
  tutorId: TutorId;
}

export interface LinkStudentAndTutorResponseBody extends BasicResponseData {}

export interface UnlinkSubjectAndSubjectCategoryRequestBody {
  categoryId: CategoryId;
  subjectId: SubjectId;
}

export interface UnlinkSubjectAndSubjectCategoryResponseBody
  extends BasicResponseData {}
export interface LinkSubjectAndSubjectCategoryRequestBody {
  categoryId: CategoryId;
  subjectId: SubjectId;
}

export interface LinkSubjectAndSubjectCategoryResponseBody
  extends BasicResponseData {}
export interface UnlinkTutorAndSubjectRequestBody {
  id: LocaleSubjectId;
}

export interface UnlinkTutorAndSubjectResponseBody extends BasicResponseData {}

export interface UnlinkStudentAndSubjectRequestBody {
  id: LocaleSubjectId;
}

export interface UnlinkStudentAndSubjectResponseBody
  extends BasicResponseData {}

export interface LinkTutorAndSubjectRequestBody {
  data: UserSubjectData;
}

export interface LinkTutorAndSubjectResponseBody extends BasicResponseData {}
export interface LinkStudentAndSubjectRequestBody {
  data: UserSubjectData;
}

export interface LinkStudentAndSubjectResponseBody extends BasicResponseData {}

export interface BasicResponseData {
  message?: string;

// success: boolean;
}
