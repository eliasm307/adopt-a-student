import {
  isPrivateStudentData, isPrivateTutorData, LinkedStudentData, LinkedTutorData, PrivateStudentData,
  PrivateTutorData, UnlinkStudentAndTutorRequestBody, UnlinkStudentAndTutorResponseBody,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../../../constants';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../../../utils/links/unlinkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const unlinkStudentAndTutor: InternalHandler<
  UnlinkStudentAndTutorRequestBody,
  UnlinkStudentAndTutorResponseBody
> = async (body, context) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (!body || !body.studentId || !body.tutorId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update tutor because provided data is not valid"
    );

  const { studentId, tutorId } = body;

  const userIsStudentOrTutor = studentId === uid || tutorId === uid;

  if (!userIsStudentOrTutor)
    throw new functionsHttps.HttpsError(
      "permission-denied",
      "Logged in user is neither the student or the tutor"
    );

  const document1Props: RemoveDocumentLinkProps<
    PrivateStudentData,
    LinkedTutorData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    documentId: studentId,
    filterPredicate: ({ id: linkId }) => linkId !== tutorId,
    linkToMutatePredicate: ({ id }) => id,
    linksPropName: "relatedTutors",
  };

  const document2Props: RemoveDocumentLinkProps<
    PrivateTutorData,
    LinkedStudentData
  > = {
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    documentId: tutorId,
    filterPredicate: ({ id: linkId }) => linkId !== studentId,
    linkToMutatePredicate: (link) => link.id,
    linksPropName: "relatedStudents",
  };

  const [updatedStudent, updatedTutor] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });
  return { message: "Success" };
};

export default unlinkStudentAndTutor;
