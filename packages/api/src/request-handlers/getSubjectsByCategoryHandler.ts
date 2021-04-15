import { PublicStudentData } from '@adopt-a-student/common';

import { ApiGetSubjectsByCategory } from '../declarations/interfaces';
import extractPublicStudentData from '../utils/extractPublicStudentData';
import { firestore, functionsHttps } from '../utils/firebase-admin';
import getGenericSubjectsByCategory from '../utils/getGenericSubjectsByCategory';
import getUsersBySubjects from '../utils/getUsersBySubjects';
import verifyRequest from '../utils/verifyRequest';

const handler: ApiGetSubjectsByCategory = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.locale || !data.subjectCategoryId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get subjects by category because provided data is missing locale or required subject category id"
    );

  const subjectCategoryId = data.subjectCategoryId;

  const genericSubjectsByCategory = await getGenericSubjectsByCategory({
    firestore,
    subjectCategoryId,
  });

  return getUsersBySubjects<PublicStudentData>({
    localeSubjectIds: data.localeSubjectIds,
    publicDataExtractor: (data) => extractPublicStudentData(data),
    userType: "Student",
    firestore,
  });
};

export default handler;
