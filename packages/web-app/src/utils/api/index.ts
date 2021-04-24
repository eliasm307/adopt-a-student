import {
  CreateStudentRequestBody, CreateStudentResponseBody, CreateTutorRequestBody,
  CreateTutorResponseBody, PrivateUserData,
} from '@adopt-a-student/common';

import { functionsClient } from '../firebase-client';
import callFirebaseFunction from '../firebase-client/callFirebaseFunction';

interface CreateNewUserProps
  extends Pick<PrivateUserData, "id" | "email" | "userName" | "imageUrl"> {}

const basicInitialUserData: Omit<
  PrivateUserData,
  "id" | "email" | "userName"
> = {
  prefferedCountries: [],
  prefferedLocales: [],
  relatedSubjects: [],
};

export async function createNewStudentUser(props: CreateNewUserProps) {
  return callFirebaseFunction<
    CreateStudentRequestBody,
    CreateStudentResponseBody
  >({
    name: "createStudent",
    data: { student: { ...basicInitialUserData, ...props, relatedTutors: [] } },
    functions: functionsClient,
  });
}

export async function createNewTutorUser(props: CreateNewUserProps) {
  return callFirebaseFunction<CreateTutorRequestBody, CreateTutorResponseBody>({
    name: "createTutor",
    data: {
      tutor: {
        ...basicInitialUserData,
        ...props,
        relatedStudents: [],
        available: true,
      },
    },
    functions: functionsClient,
  });
}
