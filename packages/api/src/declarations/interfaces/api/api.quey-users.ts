import {
  GetStudentsBySubjectsRequestBody, GetStudentsBySubjectsResponseBody,
  GetTutorsBySubjectsRequestBody, GetTutorsBySubjectsResponseBody,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../../types';

/** Get students by subjects, save this in subject */
export type ApiGetStudentsBySubjectsHandler = FirebaseCallableFunctionHandler<
  GetStudentsBySubjectsRequestBody,
  // returns
  GetStudentsBySubjectsResponseBody
>;
/** Get tutors by subjects, save this in subject */
export type ApiGetTutorsBySubjectsHandler = FirebaseCallableFunctionHandler<
  GetTutorsBySubjectsRequestBody,
  GetTutorsBySubjectsResponseBody
>;
