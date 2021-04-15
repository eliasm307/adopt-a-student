import { ApiGetTutorsBySubjectsHandler } from '../declarations/interfaces';
import extractPublicTutorData from '../utils/extractPublicTutorData';
import { functionsHttps } from '../utils/firebase-admin';
import getUsersBySubjects from '../utils/getUsersBySubjects';
import verifyRequest from '../utils/verifyRequest';

const handler: ApiGetTutorsBySubjectsHandler = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.localeSubjectIds || !Array.isArray(data.localeSubjectIds))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get students by subjects because provided locale subject ids are not valid format"
    );

  return getUsersBySubjects({
    localeSubjectIds: data.localeSubjectIds,
    publicDataExtractor: extractPublicTutorData,
    userType: "Tutor",
  });
};

export default handler;
