import {
  isPrivateStudentData, isPrivateTutorData, LinkedStudentData, LinkedTutorData, PrivateStudentData,
  PrivateTutorData, UnlinkStudentAndTutorRequestBody, UnlinkStudentAndTutorResponseBody,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../../../constants';
import { AuthData } from '../../../declarations/interfaces';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../../../utils/links/unlinkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const unlinkStudentAndTutor: InternalHandler<
  UnlinkStudentAndTutorRequestBody & AuthData,
  UnlinkStudentAndTutorResponseBody
> = async (body) => {
  const { studentId, tutorId } = body;

  const document1Props: RemoveDocumentLinkProps<
    PrivateStudentData,
    LinkedTutorData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    documentId: studentId,
    linkToMutatePredicate: ({ id: linkId }) => linkId === tutorId,
    linksPropName: "relatedTutors",
  };

  const document2Props: RemoveDocumentLinkProps<
    PrivateTutorData,
    LinkedStudentData
  > = {
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    documentId: tutorId,
    linkToMutatePredicate: ({ id: linkId }) => linkId === studentId,
    linksPropName: "relatedStudents",
  };

  const [updatedStudent, updatedTutor] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });
  return { student: updatedStudent, tutor: updatedTutor };
};

export default unlinkStudentAndTutor;
