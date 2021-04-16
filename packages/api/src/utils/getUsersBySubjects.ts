import { PrivateStudentData, PrivateTutorData } from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../constants';
import { FirestoreAdmin } from '../declarations/interfaces';
import { UserTypeName } from '../declarations/types';
import { functionsHttps } from './firebase/firebase-admin';
import groupArrayItems from './groupArrayItems';

interface Props<PublicDataType> {
  firestore: FirestoreAdmin;
  localeSubjectIds: string[];
  publicDataExtractor: (data: any) => PublicDataType;
  userType: UserTypeName;
}

export default async function getUsersBySubjects<PublicDataType>({
  localeSubjectIds,
  publicDataExtractor,
  userType,
  firestore,
}: Props<PublicDataType>) {
  const studentSubjectsField: keyof PrivateStudentData = "relatedSubjects";
  const tutorSubjectsField: keyof PrivateTutorData = "relatedSubjects";

  const userCollectionName =
    userType === "Student" ? STUDENT_COLLECTION_NAME : TUTOR_COLLECTION_NAME;
  const userSubjectsField =
    userType === "Student" ? studentSubjectsField : tutorSubjectsField;

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
        .map((data) => publicDataExtractor(data)),
    };
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue reading data from firestore",
      JSON.stringify({ error })
    );
  }
}
