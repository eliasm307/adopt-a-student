/**
 * Aliases for api method calls
 */

import {
  CreateStudentRequestBody, CreateStudentResponseBody, CreateTutorRequestBody,
  CreateTutorResponseBody, PrivateUserData,
} from '@adopt-a-student/common';

import { functionsClient } from '../firebase-client';
import callFirebaseFunction from '../firebase-client/callFirebaseFunction';

interface CreateNewUserProps
  extends Omit<PrivateUserData, "id" | "relatedSubjects"> {}

interface CreateNewStudentUserProps extends CreateNewUserProps {}

interface CreateNewTutorUserProps extends CreateNewUserProps {}

export async function createNewStudentUser(props: CreateNewStudentUserProps) {
  return callFirebaseFunction<
    CreateStudentRequestBody,
    CreateStudentResponseBody
  >({
    name: "createStudent",
    data: { student: { ...props, relatedTutors: [], relatedSubjects: [] } },
    functions: functionsClient,
  });
}

export async function createNewTutorUser(props: CreateNewTutorUserProps) {
  return callFirebaseFunction<CreateTutorRequestBody, CreateTutorResponseBody>({
    name: "createTutor",
    data: {
      tutor: {
        ...props,
        relatedStudents: [],
        relatedSubjects: [],
        available: true,
      },
    },
    functions: functionsClient,
  });
}
