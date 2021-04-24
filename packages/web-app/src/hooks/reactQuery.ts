import {
  PrivateStudentData,
  GetStudentResponseBody,
  GetStudentRequestBody,
  isPrivateStudentData,
  GetTutorsByLocalesRequestBody,
  GetTutorsByLocalesResponseBody,
} from "@adopt-a-student/common";
import { useQuery } from "react-query";
import { useAuthData, useUserRole } from ".";
import { QueryName } from "../constants";
import { functionsClient } from "../utils/firebase-client";
import callFirebaseFunction from "../utils/firebase-client/callFirebaseFunction";

interface UseGetPrivateTutorDataQueryProps {
  queryName: QueryName;
  requestData: GetTutorsByLocalesRequestBody;
}

interface UseGetPrivateStudentDataQueryProps {
  queryName: QueryName;
}

export function useGetPrivateStudentDataQuery({
  queryName,
}: UseGetPrivateStudentDataQueryProps): PrivateStudentData | null {
  const userAuth = useAuthData();
  const userRole = useUserRole();

  const { isLoading, error, data: responseData } = useQuery<
    GetStudentResponseBody,
    Error
  >(
    queryName,
    async () =>
      callFirebaseFunction<GetStudentRequestBody, GetStudentResponseBody>({
        name: "getStudent",
        data: { id: userAuth?.uid || "" },
        functions: functionsClient,
      }),
    { enabled: userRole === "Student" }
  );

  if (!responseData) {
    console.warn(
      "useGetPrivateStudentDataQuery",
      "Could not get private student data",
      { error }
    );
    return null;
  }

  if (!isPrivateStudentData(responseData.student)) {
    console.warn(
      "useGetPrivateStudentDataQuery",
      "received data but it wasnt private student data, this means you dont have access to the privat data",
      { error, responseData }
    );
    return null;
  }

  return responseData.student;
}

export function useGetTutorsByLocalesQuery({
  queryName,
  requestData,
}: UseGetPrivateTutorDataQueryProps) {
  // todo utilise or remove
  const { isLoading, error, data: responseData } = useQuery<
    GetTutorsByLocalesResponseBody,
    Error
  >(queryName, async () =>
    callFirebaseFunction<
      GetTutorsByLocalesRequestBody,
      GetTutorsByLocalesResponseBody
    >({
      name: "getTutorsByLocales",
      data: requestData,
      functions: functionsClient,
    })
  );
}
