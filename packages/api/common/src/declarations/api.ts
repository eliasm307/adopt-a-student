import { PublicStudentData, PublicTutorData } from './data-models';

export interface GetStudentsBySubjectsRequestBody {
  localeSubjectIds: string[];
}
export interface GetStudentsBySubjectsResponseBody {
  data: PublicStudentData[];
}

export interface GetTutorsBySubjectsRequestBody {
  localeSubjectIds: string[];
}
export interface GetTutorsBySubjectsResponseBody {
  data: PublicTutorData[];
}

export interface CreateStudentBody {}

export interface CreateStudentResult {}
