import { PrivateStudentData } from '@adopt-a-student/common';

import { PrivateTutorData } from '../../common/src';
import { STUDENTS_COLLECTION_NAME, TUTORS_COLLECTION_NAME } from '../constants';
import { UserTypeName } from '../declarations/types';
import extractPublicTutorData from './extractPublicStudentData';
import { firestore, functionsHttps } from './firebase-admin';
import groupArrayItems from './groupArrayItems';

interface Props {
  localeSubjectIds: string[];
  userType: UserTypeName;
}

/*
interface UserVariableConfig<P> {
  publicDataExtractor: (data: any) => P;
  userCollectionName:
    | typeof STUDENTS_COLLECTION_NAME
    | typeof TUTORS_COLLECTION_NAME;
  userSubjectsField: keyof PrivateTutorData | keyof PrivateStudentData;
}
*/

export default async function getUsersBySubjects<P>({
  localeSubjectIds,
  userType,
}: Props) {
  const studentSubjectsField: keyof PrivateStudentData = "relatedSubjects";
  const tutorSubjectsField: keyof PrivateTutorData = "relatedSubjects";

  const userCollectionName =
    userType === "Student" ? STUDENTS_COLLECTION_NAME : TUTORS_COLLECTION_NAME;
  const userSubjectsField =
    userType === "Student" ? studentSubjectsField : tutorSubjectsField;

  const publicDataExtractor =
    userType === "Student" ? extractPublicTutorData : extractTutorStudentData;

  /* array-contains-any is limited to 10 values, so split this into multiple requests if necessary
    https://firebase.google.com/docs/firestore/query-data/queries#array-contains-any
   */
  const groupedLocaleSubjectIds = groupArrayItems(localeSubjectIds, 10);

  const filteredUsersPromises = groupedLocaleSubjectIds.map(
    (subjectIdGroup) => {
      return firestore
        .collection(userCollectionName)
        .where(userSubjectsField, "array-contains-any", subjectIdGroup)
        .get();
    }
  );

  try {
    // resolve promises in parallel
    const filteredUserGroupsResults = await Promise.all(filteredUsersPromises);

    // process and return public user data
    return {
      data: filteredUserGroupsResults
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
}
