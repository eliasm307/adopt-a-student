import { https as functionsHttps, HttpsFunction, Runnable } from 'firebase-functions';

import { ObjectMap } from '@adopt-a-student/common';

import { StudentsController } from './controllers/StudentController';
import { CallableFunctionName, FirebaseCallableFunctionHandler } from './declarations/types';
import createGenericSubject from './request-handlers/createGenericSubject';
import createLocaleSubject from './request-handlers/createLocaleSubject';
import createStudent from './request-handlers/createStudent';
import createSubjectCategory from './request-handlers/createSubjectCategory';
import createTutor from './request-handlers/createTutor';
import getPrivateStudentData from './request-handlers/getPrivateStudentData';
import getPrivateTutorData from './request-handlers/getPrivateTutorDataHandler';
import getPublicStudentData from './request-handlers/getPublicStudentDataHandler';
import getPublicTutorData from './request-handlers/getPublicTutorDataHandler';
import getStudentsBySubjects from './request-handlers/getStudentsBySubjectsHandler';
import getSubject from './request-handlers/getSubject';
import getSubjectCategories from './request-handlers/getSubjectCategoriesHandler';
import getSubjectsByCategory from './request-handlers/getSubjectsByCategory';
import getTutorsBySubjects from './request-handlers/getTutorsBySubjectsHandler';
import linkGenericSubjectAndSubjectCategory from './request-handlers/linkGenericSubjectAndSubjectCategory';
import linkGenericSubjects from './request-handlers/linkGenericSubjects';
import linkStudentAndLocaleSubject from './request-handlers/linkStudentAndLocaleSubject';
import linkStudentAndTutor from './request-handlers/linkStudentAndTutor';
import linkTutorAndLocaleSubject from './request-handlers/linkTutorAndLocaleSubject';
import unlinkGenericSubjectAndSubjectCategory from './request-handlers/unlinkGenericSubjectAndSubjectCategory';
import unlinkGenericSubjects from './request-handlers/unlinkGenericSubjects';
import unlinkStudentAndLocaleSubject from './request-handlers/unlinkStudentAndLocaleSubject';
import unlinkStudentAndTutor from './request-handlers/unlinkStudentAndTutor';
import unlinkTutorAndLocaleSubject from './request-handlers/unlinkTutorAndLocaleSubject';
import updateLocaleSubject from './request-handlers/updateLocaleSubject';
import updateLocaleSubjectCategory from './request-handlers/updateLocaleSubjectCategory';
import updateStudent from './request-handlers/updateStudent';
import updateTutor from './request-handlers/updateTutor';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/*
Example from https://firebase.google.com/docs/functions/callable#web
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
*/
const callableFunctionHandlers = {
  // writeTest: firestoreWriteHandler,

  // tutors
  createTutor,
  updateTutor,
  getPrivateTutorData,
  getPublicTutorData,
  getTutorsBySubjects,

  // students
  createStudent,
  updateStudent,
  getPrivateStudentData,
  getPublicStudentData,
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
  updateLocaleSubjectCategory,

  // relationships
  linkGenericSubjects,
  unlinkGenericSubjects,

  linkGenericSubjectAndSubjectCategory,
  unlinkGenericSubjectAndSubjectCategory,

  linkStudentAndTutor,
  unlinkStudentAndTutor,

  linkTutorAndLocaleSubject,
  unlinkTutorAndLocaleSubject,

  linkStudentAndLocaleSubject,
  unlinkStudentAndLocaleSubject,
} as ObjectMap<CallableFunctionName, FirebaseCallableFunctionHandler>;

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
