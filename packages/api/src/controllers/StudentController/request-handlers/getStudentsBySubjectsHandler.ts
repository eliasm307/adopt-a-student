import {
  GetStudentsBySubjectsRequestBody, GetStudentsBySubjectsResponseBody, PublicStudentData,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import getUsersBySubjects from '../../../utils/getUsersBySubjects';
import verifyRequest from '../../../utils/verifyRequest';
import extractPublicStudentData from '../utils/extractPublicStudentData';

/** Get students by subjects, save this in subject */

const getStudentsBySubjectsHandler: InternalHandler<
  GetStudentsBySubjectsRequestBody,
  GetStudentsBySubjectsResponseBody
> = async (props) => {
  const { subjectIds } = props;

  const students = await getUsersBySubjects<PublicStudentData>({
    localeSubjectIds: subjectIds,
    publicDataExtractor: (data) => extractPublicStudentData(data),
    firestoreAdmin,
    userCollectionName: STUDENT_COLLECTION_NAME,
  });
  return { students };
};

export default getStudentsBySubjectsHandler;
