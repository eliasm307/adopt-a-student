/**
 * Aliases for api method calls
 */

import {
  CreateStudentRequestBody, CreateStudentResponseBody, CreateTutorRequestBody,
  CreateTutorResponseBody, PrivateStudentData, PrivateTutorData, PrivateUserData,
} from '@adopt-a-student/common';

import { functionsClient } from '../firebase-client';
import callFirebaseFunction from '../firebase-client/callFirebaseFunction';

interface CreateNewUserProps
  extends Pick<PrivateUserData, "email" | "userName" | "imageUrl"> {}

interface CreateNewStudentUserProps extends CreateNewUserProps {}

interface CreateNewTutorUserProps extends CreateNewUserProps {}

const basicInitialUserData: Omit<
  PrivateUserData,
  "id" | "email" | "userName"
> = {
  prefferedCountries: [],
  prefferedLocales: [],
  relatedSubjects: [],
};

export async function createNewStudentUser(props: CreateNewStudentUserProps) {
  return callFirebaseFunction<
    CreateStudentRequestBody,
    CreateStudentResponseBody
  >({
    name: "createStudent",
    data: { student: { ...basicInitialUserData, ...props, relatedTutors: [] } },
    functions: functionsClient,
  });
}

export async function createNewTutorUser(props: CreateNewTutorUserProps) {
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
