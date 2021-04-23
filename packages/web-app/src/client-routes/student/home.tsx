// list of tutors available from related subjects, list of tutors linked,
// list filters
// list search
// should only include tutors by subjects defined in profile

import React from 'react';
import { useQuery } from 'react-query';

import { CreateTutorRequestBody, CreateTutorResponseBody } from '@adopt-a-student/common';

import { functionsClient } from '../../utils/firebase-client';
import callFirebaseFunction from '../../utils/firebase-client/callFirebaseFunction';

const StudentHome = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    callFirebaseFunction<CreateTutorRequestBody, CreateTutorResponseBody>({
      name: "",
      data,
      functions: functionsClient,
    })
  );

  //   if (isLoading) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;

  return <div>student home</div>;
};

export default StudentHome;
