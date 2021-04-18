import {
  GetTutorsBySubjectsRequestBody, GetTutorsBySubjectsResponseBody,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import getUsersBySubjects from '../../../utils/getUsersBySubjects';
import verifyRequest from '../../../utils/verifyRequest';
import extractPublicTutorData from './utils/extractPublicTutorData';

/** Get tutors by subjects, save this in subject */
const getTutorsBySubjects: FirebaseCallableFunctionHandler<
  GetTutorsBySubjectsRequestBody,
  GetTutorsBySubjectsResponseBody
> = async (data, context) => {
  const auth = verifyRequest(data, context);

  // verify received data
  if (!data?.subjectIds || !Array.isArray(data.subjectIds))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get students by subjects because provided locale subject ids are not valid format"
    );

  const tutors = await getUsersBySubjects({
    localeSubjectIds: data.subjectIds,
    publicDataExtractor: extractPublicTutorData,
    userCollectionName: TUTOR_COLLECTION_NAME,
    userSubjectsField: "relatedSubjects",
    firestore: firestoreAdmin,
  });

  return { tutors };
};

export default getTutorsBySubjects;
