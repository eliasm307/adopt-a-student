import {
  CreateStudentRequestBody, CreateStudentResponseBody, CreateTutorRequestBody,
  CreateTutorResponseBody, PrivateStudentData, PrivateTutorData, PrivateUserData,
} from '@adopt-a-student/common';

import { functionsClient } from '../firebase-client';
import callFirebaseFunction from '../firebase-client/callFirebaseFunction';

interface CreateNewUserProps
  extends Pick<PrivateUserData, "id" | "email" | "userName" | "imageUrl"> {}

interface CreateNewStudentUserProps extends CreateNewUserProps {
  afterUserCreate?: (user: PrivateStudentData) => void;
}

interface CreateNewTutorUserProps extends CreateNewUserProps {
  afterUserCreate?: (user: PrivateTutorData) => void;
}

const basicInitialUserData: Omit<
  PrivateUserData,
  "id" | "email" | "userName"
> = {
  prefferedCountries: [],
  prefferedLocales: [],
  relatedSubjects: [],
};

export async function createNewStudentUser(props: CreateNewStudentUserProps) {
  const { afterUserCreate } = props;

  const result = await callFirebaseFunction<
    CreateStudentRequestBody,
    CreateStudentResponseBody
  >({
    name: "createStudent",
    data: { student: { ...basicInitialUserData, ...props, relatedTutors: [] } },
    functions: functionsClient,
  });

  if (result && result.student && afterUserCreate)
    afterUserCreate(result.student);
}

export async function createNewTutorUser(props: CreateNewTutorUserProps) {
  const { afterUserCreate } = props;

  const result = await callFirebaseFunction<
    CreateTutorRequestBody,
    CreateTutorResponseBody
  >({
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

  if (result && result.tutor && afterUserCreate) afterUserCreate(result.tutor);
}
