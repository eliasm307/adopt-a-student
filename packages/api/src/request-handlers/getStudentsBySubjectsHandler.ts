import {
  GetStudentsBySubjectsRequestBody, GetStudentsBySubjectsResponseBody, PublicStudentData,
} from '@adopt-a-student/common';

import { FirebaseCallableFunctionHandler } from '../declarations/types';
import extractPublicStudentData from '../utils/extractPublicStudentData';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import getUsersBySubjects from '../utils/getUsersBySubjects';
import verifyRequest from '../utils/verifyRequest';

/** Get students by subjects, save this in subject */
type ApiGetStudentsBySubjectsHandler = FirebaseCallableFunctionHandler<
  GetStudentsBySubjectsRequestBody,
  // returns
  GetStudentsBySubjectsResponseBody
>;

const getStudentsBySubjectsHandler: ApiGetStudentsBySubjectsHandler = async (
  data,
  context
) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.subjectIds || !Array.isArray(data.subjectIds))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get students by subjects because provided locale subject ids are not valid format"
    );

  return getUsersBySubjects<PublicStudentData>({
    localeSubjectIds: data.subjectIds,
    publicDataExtractor: (data) => extractPublicStudentData(data),
    userType: "Student",
    firestore: firestoreAdmin,
  });
};

export default getStudentsBySubjectsHandler;
