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
import log from "../utils/log";

interface UseGetPrivateTutorDataQueryProps {
  queryName: QueryName;
  requestData: GetTutorsByLocalesRequestBody;
}

interface UseGetPrivateStudentDataQueryProps {
  queryName: QueryName;
}

// ! react query usage needs to be investigated, bad usage can lead to performance losses
// ! as a significant number of unnessesary queries are made
/*
export function useGetPrivateStudentDataQuery({
  queryName,
}: UseGetPrivateStudentDataQueryProps): PrivateStudentData | null {
  const userAuth = useAuthData();
  const userRole = useUserRole();

  if (userRole === "Student") {
    console.warn(
      "Running useGetPrivateStudentDataQuery because user is a student..."
    );
  } else {
    log(
      "NOT Running useGetPrivateStudentDataQuery because user is not a student"
    );
  }

  const { isLoading, error, data: responseData } = useQuery<
    GetStudentResponseBody | null,
    Error
  >(
    queryName,
    async () =>
      callFirebaseFunction<GetStudentRequestBody, GetStudentResponseBody>({
        name: "getStudent",
        data: { id: userAuth?.uid || "" },
        functions: functionsClient,
      }),
    { enabled: userRole === "Student" && !!userAuth, retry: !!userAuth }
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
    GetTutorsByLocalesResponseBody | null,
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
*/
