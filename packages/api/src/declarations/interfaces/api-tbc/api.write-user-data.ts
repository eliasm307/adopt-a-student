import { PrivateStudentData, PrivateTutorData } from '@adopt-a-student/common';

import { BasicResponseData } from '../';
import { FirebaseCallableFunctionHandler } from '../../types';

/** Post update to tutor profile */
export type ApiUpdateTutorDataHandler = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    data?: Partial<PrivateTutorData>;
  },
  BasicResponseData & { data: PrivateTutorData }
>;

/** Post update to student profile */
export type ApiSetStudentProfile = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    data?: Partial<PrivateStudentData>;
  },
  BasicResponseData
>;

/** Create tutor profile */
export type ApiCreateTutorHandler = FirebaseCallableFunctionHandler<
  {
    data?: PrivateTutorData;
  },
  BasicResponseData & { data: PrivateTutorData }
>;
