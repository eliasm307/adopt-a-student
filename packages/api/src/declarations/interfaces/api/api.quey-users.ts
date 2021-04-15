import { PublicStudentData, PublicTutorData } from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../../types';

/** Get students by subjects, save this in subject */
export type ApiGetStudentsBySubjectsHandler = FirebaseCallableFunctionHandler<
  {
    localeSubjectIds: string[];
  },
  // returns
  { data: PublicStudentData[] }
>;
/** Get tutors by subjects, save this in subject */
export type ApiGetTutorsBySubjectsHandler = FirebaseCallableFunctionHandler<
  {
    localeSubjectIds: string[];
  },
  { data: PublicTutorData[] }
>;
