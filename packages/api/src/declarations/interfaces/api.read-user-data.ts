import { PrivateStudentData, PrivateTutorData } from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../types';

/** Get student profile by uid. users can only get their own private data */
export type ApiGetPrivateStudentDataHandler = FirebaseCallableFunctionHandler<
  undefined,
  // todo needs to verify a user has access to this data
  { data: PrivateStudentData }
>;
/** Get tutor profile by uid */
export type ApiGetPrivateTutorDataHandler = FirebaseCallableFunctionHandler<
  { uid: string },
  // todo needs to verify a user has access to this data
  { data: PrivateTutorData }
>;
