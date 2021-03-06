/**
 * Aliases for api method calls
 */

import {
  CreateStudentRequestBody,
  CreateStudentResponseBody,
  CreateTutorRequestBody,
  CreateTutorResponseBody,
  GetTutorRequestBody,
  GetTutorResponseBody,
  LinkStudentAndTutorRequestBody,
  LinkStudentAndTutorResponseBody,
  PrivateStudentData,
  PrivateUserData,
  UpdateStudentRequestBody,
  UpdateStudentResponseBody,
} from "@adopt-a-student/common";

import { functionsClient } from "../firebase-client";
import callFirebaseFunction from "../firebase-client/callFirebaseFunction";

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

export async function updateStudentUser(
  props: Partial<Omit<PrivateStudentData, "id">>
) {
  return callFirebaseFunction<
    UpdateStudentRequestBody,
    UpdateStudentResponseBody
  >({
    name: "updateStudent",
    data: { updates: { ...props } },
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

// todo add a function to get a batch of tutors from a list of ids

export async function getTutorUser(props: { id: string }) {
  const { id } = props;
  return callFirebaseFunction<GetTutorRequestBody, GetTutorResponseBody>({
    name: "getTutor",
    data: {
      id,
    },
    functions: functionsClient,
  });
}

export async function linkStudentAndTutor(
  props: LinkStudentAndTutorRequestBody
) {
  return callFirebaseFunction<
    LinkStudentAndTutorRequestBody,
    LinkStudentAndTutorResponseBody
  >({
    name: "linkStudentAndTutor",
    data: props,
    functions: functionsClient,
  });
}
