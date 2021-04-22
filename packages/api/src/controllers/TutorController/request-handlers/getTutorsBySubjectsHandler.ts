import {
  GetTutorsBySubjectsRequestBody, GetTutorsBySubjectsResponseBody,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import getUsersBySubjects from '../../../utils/getUsersBySubjects';
import verifyRequest from '../../../utils/verifyRequest';
import extractPublicTutorData from './utils/extractPublicTutorData';

/** Get tutors by subjects, save this in subject */
const getTutorsBySubjects: InternalHandler<
  GetTutorsBySubjectsRequestBody,
  GetTutorsBySubjectsResponseBody
> = async (props) => {
  const { subjectIds } = props;

  // verify received data
  if (!subjectIds || !Array.isArray(subjectIds))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not get students by subjects because provided locale subject ids are not valid format"
    );
  const tutors = await getUsersBySubjects({
    localeSubjectIds: subjectIds,
    publicDataExtractor: extractPublicTutorData,
    userCollectionName: TUTOR_COLLECTION_NAME,
    firestoreAdmin,
  });

  return { tutors };
};

export default getTutorsBySubjects;
