import { STUDENT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../constants';
import { ApiLinkStudentAndTutor } from '../declarations/interfaces';
import { firestore, functionsHttps } from '../utils/firebase/firebase-admin';
import getDocumentData from '../utils/firebase/getDocumentData';
import updateDocumentData from '../utils/firebase/updateDocumentData';
import isPrivateStudentData from '../utils/type-predicates/isPrivateStudentData';
import isPrivateTutorData from '../utils/type-predicates/isPrivateTutorData';
import verifyRequest from '../utils/verifyRequest';

const linkStudentAndTutor: ApiLinkStudentAndTutor = async (body, context) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (!body || !body.studentId || !body.tutorId)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not update tutor because provided data is not valid"
    );

  const { studentId, tutorId } = body;

  if (studentId !== uid && tutorId !== uid)
    throw new functionsHttps.HttpsError(
      "permission-denied",
      "Logged in user is neither the student or the tutor"
    );

  const studentCrudProps = {
    id: studentId,
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    firestore,
  };
  const tutorCrudProps = {
    id: tutorId,
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    firestore,
  };

  // Read current data
  const studentReadPromise = getDocumentData({
    ...studentCrudProps,
  });

  const tutorReadPromise = getDocumentData({
    ...tutorCrudProps,
  });

  const [student, tutor] = await Promise.all([
    studentReadPromise,
    tutorReadPromise,
  ]);

  // add links
  student.tutors.push({ id: tutorId });
  tutor.students.push({ id: studentId });

  // write changes back to firestore

  const studentUpdatePromise = updateDocumentData({
    ...studentCrudProps,
    edits: student,
    dataUpdater: ({ edits, existingData }) => ({
      ...existingData,
      tutors: edits.tutors!,
    }),
  });

  const tutorUpdatePromise = updateDocumentData({
    ...tutorCrudProps,
    edits: tutor,
    dataUpdater: ({ edits, existingData }) => ({
      ...existingData,
      tutors: edits.students!,
    }),
  });

  const [updatedStudent, updatedTutor] = await Promise.all([
    studentUpdatePromise,
    tutorUpdatePromise,
  ]);

  return { message: "Success" };
};

export default linkStudentAndTutor;
