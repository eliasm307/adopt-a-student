import { PublicStudentData } from '@adopt-a-student/common';

import { ApiGetStudentsBySubjectsHandler } from '../declarations/interfaces';
import extractPublicStudentData from '../utils/extractPublicStudentData';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import getUsersBySubjects from '../utils/getUsersBySubjects';
import verifyRequest from '../utils/verifyRequest';

const getStudentsBySubjectsHandler: ApiGetStudentsBySubjectsHandler = async (
  data,
  context
) => {
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
    firestore: firestoreAdmin,
  });
};

export default getStudentsBySubjectsHandler;
