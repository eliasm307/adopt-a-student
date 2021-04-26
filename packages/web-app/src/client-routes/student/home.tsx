// list of tutors available from related subjects, list of tutors linked,
// list filters
// list search
// should only include tutors by subjects defined in profile

import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import {
  GetTutorsByLocalesRequestBody, GetTutorsByLocalesResponseBody, PublicTutorData,
} from '@adopt-a-student/common';

import TutorList from '../../components/TutorList';
import { QueryName } from '../../constants';
import { useUserPrivateStudentData } from '../../providers/PrivateStudentDataProvider';
import { functionsClient } from '../../utils/firebase-client';
import callFirebaseFunction from '../../utils/firebase-client/callFirebaseFunction';
import log from '../../utils/log';

const StudentHome = () => {
  const privateData = useUserPrivateStudentData();

  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setResponseData] = useState<
    PublicTutorData[] | undefined
  >(undefined);

  useEffect(() => {
    const task = async () => {
      log("studentHome", "starting query for tutors");
      try {
        const data = await callFirebaseFunction<
          GetTutorsByLocalesRequestBody,
          GetTutorsByLocalesResponseBody
        >({
          name: "getTutorsByLocales",
          data: {
            countries: privateData?.prefferedCountries || ["World"],
            locales: privateData?.prefferedLocales || [],
          },
          functions: functionsClient,
        });
        log(
          "studentHome",
          `tutor query successful, ${data?.tutors.length || 0} results`
        );
        setResponseData(data?.tutors);
        setIsLoading(false);
      } catch (error) {
        console.error("StudentHome", { error });
      } finally {
        setIsLoading(false);
      }
    };
    task();
  }, [privateData?.prefferedCountries, privateData?.prefferedLocales]);

  /*
  const { isLoading, error, data: responseData } = useQuery<
    GetTutorsByLocalesResponseBody | null,
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
    { enabled: !!privateData, retry: false }
  );
  */

  if (isLoading) return <div>Loading...</div>;

  /*
  if (error)
    return (
      <div>
        An error has occurred: {error.name} {error.message} Stack: {error.stack}
      </div>
    );
    */

  if (!responseData || !responseData.length) {
    log("No Data found: result", { responseData });
    return (
      <div style={{ display: "grid", placeItems: "center", height: "50vh" }}>
        <div style={{ fontSize: "4em" }}>No teachers found 😢</div>
      </div>
    );
  }

  return <TutorList tutors={responseData} />;
};

export default StudentHome;
