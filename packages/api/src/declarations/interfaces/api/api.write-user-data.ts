import { FirebaseCallableFunctionHandler } from '../../types';

export type ApiUpdateStudentDataHandler = FirebaseCallableFunctionHandler<
  {
    // todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
    // todo needs to verify a user has access to this data
    data?: Partial<Omit<PrivateStudentData, "id">>;
  },
  { data: PrivateStudentData }
>;
