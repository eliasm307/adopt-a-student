import { PrivateStudentData, PrivateTutorData } from '@adopt-a-student/common';

import { BasicResponseData } from '../';
import { FirebaseCallableFunctionHandler } from '../../types';

export type ApiCreateTutorHandler = FirebaseCallableFunctionHandler<
  {
    data?: Omit<PrivateTutorData, "id">;
  },
  BasicResponseData & { data: PrivateTutorData }
>;

export type ApiUpdateTutorDataHandler = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    data?: Partial<Omit<PrivateTutorData, "id">>;
  },
  BasicResponseData & { data: PrivateTutorData }
>;

export type ApiCreateStudentHandler = FirebaseCallableFunctionHandler<
  {
    data?: Omit<PrivateStudentData, "id">;
  },
  BasicResponseData & { data: PrivateStudentData }
>;

export type ApiUpdateStudentDataHandler = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    data?: Partial<Omit<PrivateStudentData, "id">>;
  },
  BasicResponseData & { data: PrivateStudentData }
>;
