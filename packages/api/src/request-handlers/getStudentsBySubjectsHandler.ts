import { PrivateTutorData, PublicStudentData } from '@adopt-a-student/common';

import { PrivateStudentData } from '../../common/src';
import { STUDENTS_COLLECTION_NAME, TUTORS_COLLECTION_NAME } from '../constants';
import { API } from '../declarations/interfaces';
import createPath from '../utils/createPath';
import { firestore, functionsHttps } from '../utils/firebase-admin';
import groupArrayItems from '../utils/groupArrayItems';
import isPartialPrivateTutorData from '../utils/type-predicates/isPartialPrivateTutorData';
import verifyRequest from '../utils/verifyRequest';

const handler: API.getStudentsBySubjectsHandler = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.localeSubjectIds || !Array.isArray(data.localeSubjectIds))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get students by subjects because provided locale subject ids are not valid format"
    );

  const groupedLocaleSubjectIds = groupArrayItems(data.localeSubjectIds, 10);

  const documentPath = createPath(TUTORS_COLLECTION_NAME, auth.uid);

  const subjectsField: keyof PrivateStudentData = "relatedSubjects";

  /** todo array-contains-any is limited to 10 values https://firebase.google.com/docs/firestore/query-data/queries#array-contains-any */

  const filteredStudentsPromises = groupedLocaleSubjectIds.map(
    (subjectIdGroup) => {
      return firestore
        .collection(STUDENTS_COLLECTION_NAME)
        .where(subjectsField, "array-contains-any", subjectIdGroup)
        .get();
    }
  );

  const filteredStudentGroupsResults = await Promise.all(
    filteredStudentsPromises
  );

  const flatDataList = filteredStudentGroupsResults
    .reduce((accumulatedData, currentGroup) => {
      const groupData = currentGroup.docs.map((doc) => doc.data());

      return [...accumulatedData, ...groupData];
    }, [] as any[])
    .map((data) => {});

  // check if tutor already exists for this user
  const docSnapshot = await firestore.doc(documentPath).get();

  if (!docSnapshot.exists)
    throw new functionsHttps.HttpsError(
      "not-found",
      "Could not edit tutor because a tutor profile doesnt exist for this user, create one first"
    );

  // edit tutor
  try {
    await docSnapshot.ref.update(data);
    const newSnapshot = await docSnapshot.ref.get();

    return {
      success: true,
      data: newSnapshot.data() as PrivateTutorData,
    };
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue creating the tutor",
      JSON.stringify(data)
    );
  }
};

export default handler;
