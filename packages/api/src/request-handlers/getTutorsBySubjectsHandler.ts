import {
  GetTutorsBySubjectsRequestBody, GetTutorsBySubjectsResponseBody,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../declarations/types';
import extractPublicTutorData from '../utils/extractPublicTutorData';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import getUsersBySubjects from '../utils/getUsersBySubjects';
import verifyRequest from '../utils/verifyRequest';

/** Get tutors by subjects, save this in subject */
export type ApiGetTutorsBySubjectsHandler = FirebaseCallableFunctionHandler<
  GetTutorsBySubjectsRequestBody,
  GetTutorsBySubjectsResponseBody
>;

const handler: ApiGetTutorsBySubjectsHandler = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.subjectIds || !Array.isArray(data.subjectIds))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get students by subjects because provided locale subject ids are not valid format"
    );

  return getUsersBySubjects({
    localeSubjectIds: data.subjectIds,
    publicDataExtractor: extractPublicTutorData,
    userType: "Tutor",
    firestore: firestoreAdmin,
  });
};

export default handler;
