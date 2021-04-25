// list of tutors available from related subjects, list of tutors linked,
// list filters
// list search
// should only include tutors by subjects defined in profile

import React from 'react';
import { useQuery } from 'react-query';

import {
  GetTutorsByLocalesRequestBody, GetTutorsByLocalesResponseBody,
} from '@adopt-a-student/common';

import TutorList from '../../components/TutorList';
import { QueryName } from '../../constants';
import { useUserPrivateStudentData } from '../../providers/PrivateStudentDataProvider';
import { functionsClient } from '../../utils/firebase-client';
import callFirebaseFunction from '../../utils/firebase-client/callFirebaseFunction';

const StudentHome = () => {
  const privateData = useUserPrivateStudentData();
  const { isLoading, error, data: responseData } = useQuery<
    GetTutorsByLocalesResponseBody,
    Error
  >(
    QueryName.TutorsByLocales,
    async () =>
      callFirebaseFunction<
        GetTutorsByLocalesRequestBody,
        GetTutorsByLocalesResponseBody
      >({
        name: "getTutorsByLocales",
        data: {
          countries: privateData?.prefferedCountries || ["World"],
          locales: privateData?.prefferedLocales || [],
        },
        functions: functionsClient,
      }),
    { enabled: !!privateData, retry: !!privateData }
  );

  if (isLoading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        An error has occurred: {error.name} {error.message} Stack: {error.stack}
      </div>
    );

  if (!responseData || !responseData.tutors.length)
    return <div>No Data found: result = {JSON.stringify(responseData)}</div>;

  return <TutorList tutors={responseData.tutors} />;
};

export default StudentHome;
