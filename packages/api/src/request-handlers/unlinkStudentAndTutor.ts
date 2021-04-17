import {
  isPrivateStudentData, LinkedStudentData, LinkedTutorData, PrivateStudentData, PrivateTutorData,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../constants';
import { ApiUnlinkStudentAndTutor } from '../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../utils/links/unlinkDocuments';
import verifyRequest from '../utils/verifyRequest';

const unlinkStudentAndTutor: ApiUnlinkStudentAndTutor = async (
  body,
  context
) => {
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
    id: studentId,
    filterPredicate: ({ id: linkId }) => linkId !== tutorId,
    linkReducer: ({ id }) => id,
    linksPropName: "linkedTutors",
  };

  const document2Props: RemoveDocumentLinkProps<
    PrivateTutorData,
    LinkedStudentData
  > = {
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    id: tutorId,
    filterPredicate: ({ id: linkId }) => linkId !== studentId,
    linkReducer: (link) => link.id,
    linksPropName: "linkedStudents",
  };

  const [updatedStudent, updatedTutor] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestore: firestoreAdmin,
  });

  return { message: "Success" };
};

export default unlinkStudentAndTutor;
