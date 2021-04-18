import { https as functionsHttps, HttpsFunction, Runnable } from 'firebase-functions';

import { ObjectMap } from '@adopt-a-student/common';

import { StudentsController } from './controllers/StudentController/StudentController';
import { TutorsController } from './controllers/TutorController/TutorController';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/*
Example from https://firebase.google.com/docs/functions/callable#web
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
*/

type CallableName = typeof StudentsController.callableNames[number] | any;

// getStudentsBySubjects;
const callableFunctionHandlers = {
  // writeTest: firestoreWriteHandler,

  // tutors
  createTutor: TutorsController.createTutor,
  updateTutor: TutorsController.updateTutor,
  getTutor: TutorsController.getTutor,
  getTutorsBySubjects: TutorsController.getTutorsBySubjects,

  // students
  createStudent: StudentsController.createStudent,
  updateStudent: StudentsController.updateStudent,
  getStudent: StudentsController.getStudent,
  getStudentsBySubjects: StudentsController.getStudentsBySubjects,

  // subjects
  createGenericSubject,
  // updateGenericSubject,
  createLocaleSubject,
  updateLocaleSubject,
  getSubject,
  getSubjectsByCategory,

  // subject categories
  getSubjectCategories,
  createSubjectCategory,
  updateSubjectCategory,

  // relationships
  linkGenericSubjects,
  unlinkGenericSubjects,

  linkSubjectAndSubjectCategory,
  unlinkSubjectAndSubjectCategory,

  linkStudentAndTutor,
  unlinkStudentAndTutor,

  linkTutorAndLocaleSubject,
  unlinkTutorAndLocaleSubject,

  linkStudentAndLocaleSubject,
  unlinkStudentAndLocaleSubject,
} as ObjectMap<CallableName, (body: any, context?: any) => Promise<any>>;

/*
callableFunctionHandlers.test = (data, context) => {
  return { message: "yay" };
  //   .region("europe-west1")
  // ...
};
*/

// export defined handlers with given callable function names
module.exports = Object.entries(callableFunctionHandlers).reduce(
  (exports, [callableName, callableHandler]) => {
    if (callableHandler)
      exports[callableName] = functionsHttps.onCall(callableHandler);
    return exports;
  },
  {} as ObjectMap<string, HttpsFunction & Runnable<any>>
);

// export default callableFunctions;

/** Get all student profile data */
// export const getStudent = functions.https.onCall(_getStudent);

/** Update student profile data */
// export const updateStudent = functions.https.onCall(_updateStudent);

/** Get all tutor profile data */
// export const getTutor = functions.https.onCall(_getTutor);

/** Update tutor profile data */
// export const updateTutor = functions.https.onCall(_updateTutor);

/** Get subject by id */
// export const getSubject = functions.https.onCall(_getSubject);

/** Update subject by id */
// export const updateSubject = functions.https.onCall(_updateSubject);

/** Get all subjects */
// export const getAllSubjects = functions.https.onCall(_getAllSubjects);

/** Get students interested in subjects */
// export const getStudentsBySubjects = functions.https.onCall(
//   _getStudentsBySubjects
// );

/** Get students interested in subjects */
// export const getTutorsBySubjects = functions.https.onCall(_getTutorsBySubjects);
