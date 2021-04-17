import { PublicStudentData, PublicTutorData } from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../../types';

export interface GetStudentsBySubjectsBody {
  localeSubjectIds: string[];
}
export interface GetStudentsBySubjectsResult {
  data: PublicStudentData[];
}
/** Get students by subjects, save this in subject */
export type ApiGetStudentsBySubjectsHandler = FirebaseCallableFunctionHandler<
  GetStudentsBySubjectsBody,
  // returns
  GetStudentsBySubjectsResult
>;
/** Get tutors by subjects, save this in subject */
export type ApiGetTutorsBySubjectsHandler = FirebaseCallableFunctionHandler<
  {
    localeSubjectIds: string[];
  },
  { data: PublicTutorData[] }
>;
