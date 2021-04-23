import {
  GetTutorsByLocalesRequestBody, GetTutorsByLocalesResponseBody,
} from '@adopt-a-student/common';

import { TUTOR_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import getUsersByLocales from '../../../utils/getUsersByLocales';
import getUsersBySubjects from '../../../utils/getUsersBySubjects';
import verifyRequest from '../../../utils/verifyRequest';
import extractPublicTutorData from './utils/extractPublicTutorData';

/** Get tutors by subjects, save this in subject */
const getTutorsByLocales: InternalHandler<
  GetTutorsByLocalesRequestBody,
  GetTutorsByLocalesResponseBody
> = async (props) => {
  const { countries, locales } = props;

  const tutors = await getUsersByLocales({
    countries,
    locales,
    publicDataExtractor: extractPublicTutorData,
    userCollectionName: TUTOR_COLLECTION_NAME,
    firestoreAdmin,
  });

  return { tutors };
};

export default getTutorsByLocales;
