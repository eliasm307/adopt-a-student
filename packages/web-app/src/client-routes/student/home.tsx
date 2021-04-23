// list of tutors available from related subjects, list of tutors linked,
// list filters
// list search
// should only include tutors by subjects defined in profile

import React from 'react';
import { useQuery } from 'react-query';

import {
  GetTutorsByLocalesRequestBody, GetTutorsByLocalesResponseBody,
} from '@adopt-a-student/common';

import { functionsClient } from '../../utils/firebase-client';
import callFirebaseFunction from '../../utils/firebase-client/callFirebaseFunction';

const requestData: GetTutorsByLocalesRequestBody = {
  countries: ["Australia"],
  locales: ["en"],
};

const StudentHome = () => {
  const { isLoading, error, data: responseData } = useQuery<
    GetTutorsByLocalesResponseBody,
    Error
  >("repoData", async () =>
    callFirebaseFunction<
      GetTutorsByLocalesRequestBody,
      GetTutorsByLocalesResponseBody
    >({
      name: "getTutorsByLocales",
      data: requestData,
      functions: functionsClient,
    })
  );

  if (isLoading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        An error has occurred: {error.name} {error.message} Stakc: {error.stack}
      </div>
    );

  return <div>student home Data: {JSON.stringify(responseData, null, 2)}</div>;
};

export default StudentHome;
