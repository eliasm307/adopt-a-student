import {
  GetTutorsByLocaleRequestBody, GetTutorsByLocaleResponseBody,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import getUsersBySubjects from '../../../utils/getUsersBySubjects';
import verifyRequest from '../../../utils/verifyRequest';
import extractPublicTutorData from './utils/extractPublicTutorData';

/** Get tutors by subjects, save this in subject */
const getTutorsByLocale: InternalHandler<
  GetTutorsByLocaleRequestBody,
  GetTutorsByLocaleResponseBody
> = async (props) => {
  const { country, locale } = props;

  const tutors = await getUsersByLocale({
    localeSubjectIds: subjectIds,
    publicDataExtractor: extractPublicTutorData,
    userCollectionName: TUTOR_COLLECTION_NAME,
    firestoreAdmin,
  });

  return { tutors };
};

export default getTutorsByLocale;
