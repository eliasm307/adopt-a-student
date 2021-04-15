import { PublicStudentData } from '@adopt-a-student/common';

import { ApiGetStudentsBySubjectsHandler } from '../declarations/interfaces';
import extractPublicStudentData from '../utils/extractPublicStudentData';
import { functionsHttps } from '../utils/firebase-admin';
import getUsersBySubjects from '../utils/getUsersBySubjects';
import verifyRequest from '../utils/verifyRequest';

const handler: ApiGetStudentsBySubjectsHandler = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.localeSubjectIds || !Array.isArray(data.localeSubjectIds))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get students by subjects because provided locale subject ids are not valid format"
    );

  return getUsersBySubjects<PublicStudentData>({
    localeSubjectIds: data.localeSubjectIds,
    publicDataExtractor: (data) => extractPublicStudentData(data),
    userType: "Student",
  });

  /* array-contains-any is limited to 10 values, so split this into multiple requests if necessary
    https://firebase.google.com/docs/firestore/query-data/queries#array-contains-any
   */
  /*
  const groupedLocaleSubjectIds = groupArrayItems(data.localeSubjectIds, 10);

  const subjectsField: keyof PrivateStudentData = "relatedSubjects";

  const filteredStudentsPromises = groupedLocaleSubjectIds.map(
    (subjectIdGroup) => {
      return firestore
        .collection(STUDENTS_COLLECTION_NAME)
        .where(subjectsField, "array-contains-any", subjectIdGroup)
        .get();
    }
  );

  try {
    // resolve promises in parallel
    const filteredStudentGroupsResults = await Promise.all(
      filteredStudentsPromises
    );

    // process and return public student data
    return {
      data: filteredStudentGroupsResults
        // reduce to flat list
        .reduce((accumulatedData, currentGroup) => {
          const groupData = currentGroup.docs.map((doc) => doc.data());
          return [...accumulatedData, ...groupData];
        }, [] as any[])

        // extract public data for each user
        .map((data) => extractPublicTutorData(data)),
    };
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue reading data from firestore",
      JSON.stringify({ error })
    );
  }
  */
};

export default handler;
