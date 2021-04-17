import {
  LinkedStudentData, LinkedTutorData, PrivateStudentData, PrivateTutorData,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../constants';
import { ApiLinkStudentAndTutor } from '../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../utils/links/linkDocuments';
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

  const userIsStudentOrTutor = studentId === uid || tutorId === uid;

  if (!userIsStudentOrTutor)
    throw new functionsHttps.HttpsError(
      "permission-denied",
      "Logged in user is neither the student or the tutor"
    );

  /*
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

  // Read current data in parallel
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

  // remove any existing links then add new links
  const studentTutors = student.tutors.reduce(
    (acc, user) => ({ ...acc, [user.id]: true }),
    {} as Record<string, boolean>
  );
  const tutorStudents = tutor.students.reduce(
    (acc, user) => ({ ...acc, [user.id]: true }),
    {} as Record<string, boolean>
  );

  const studentAndTutorAlreadyLinked =
    studentTutors[tutorId] && tutorStudents[studentId];

  // avoid any uneccessary writes
  if (studentAndTutorAlreadyLinked) return { message: "Users already linked" };

  // only add links if they didnt exist already
  if (!studentTutors[tutorId]) student.tutors.push({ id: tutorId });
  if (!tutorStudents[studentId]) tutor.students.push({ id: studentId });

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
      students: edits.students!,
    }),
  });
  */

  const document1Props: AddDocumentLinkProps<
    PrivateStudentData,
    LinkedTutorData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    id: studentId,
    linkToAdd: { id: tutorId },
    linkReducer: (link) => link.id,
    linksPropName: "linkedTutors",
  };

  const document2Props: AddDocumentLinkProps<
    PrivateTutorData,
    LinkedStudentData
  > = {
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    id: tutorId,
    linkToAdd: { id: studentId },
    linkReducer: (link) => link.id,
    linksPropName: "linkedStudents",
  };

  const [updatedStudent, updatedTutor] = await linkDocuments({
    document1Props,
    document2Props,
    firestore: firestoreAdmin,
  });

  return { message: "Success linking users" };
};

export default linkStudentAndTutor;
